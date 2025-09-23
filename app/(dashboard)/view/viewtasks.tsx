import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import Task from '@/type/task';
import { deletetask } from '@/service/TaskService';

export default function TaskViewScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  const priorities = {
    high: { color: '#ef4444', icon: 'alert-circle', label: 'High' },
    medium: { color: '#f59e0b', icon: 'remove-circle', label: 'Medium' },
    low: { color: '#10b981', icon: 'checkmark-circle', label: 'Low' }
  };

  const categories = {
    work: { icon: 'briefcase', color: '#3b82f6', label: 'Work' },
    personal: { icon: 'person', color: '#8b5cf6', label: 'Personal' },
    health: { icon: 'heart', color: '#ec4899', label: 'Health' }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    else if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    else return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  // Load tasks
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
      const alltasks = querySnapshot.docs
        .filter((doc) => doc.data().uId === auth.currentUser?.uid)
        .map((doc) => ({ ...doc.data(), id: doc.id } as Task));
      setTasks(alltasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Delete task function
  const handleDelete = async (taskId: string) => {
    try {
        await deletetask(taskId);
        setDeleteLoadingId(null);
    } catch (error) {
        console.error("Error deleting task: ", error);
        setDeleteLoadingId(null);
    }
  }

  // Render each task card
  const renderTaskCard = ({ item: task }: { item: Task }) => (
    <View className={`bg-white rounded-2xl p-4 mb-4 mx-4 shadow-lg border-l-4 
      ${task.completed ? 'opacity-60 border-gray-400' : 
      task.priority === 'high' ? 'border-red-500' : 
      task.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}`}>

      {/* Header */}
      <View className="flex-row justify-between mb-2">
        <View className="flex-1 mr-3">
          <Text className={`text-lg font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {task.title}
          </Text>
          <Text className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center">
        {/* Date */}
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#6b7280" />
          <Text className="ml-1 text-xs text-gray-500 font-medium">{formatDate(task.date)}</Text>
        </View>

        {/* Edit & Delete Buttons */}
        <View className="flex-row space-x-2">
          {/* Edit */}
          <TouchableOpacity
            className="flex-row items-center px-2 py-1 bg-gray-100 rounded-full"
            onPress={() => router.push(`/task/${task.id}`)}
          >
            <Ionicons name="create-outline" size={16} color="#6b7280" />
            <Text className="ml-1 text-xs text-gray-600">Edit</Text>
          </TouchableOpacity>

          {/* Delete */}
          <TouchableOpacity
            className="flex-row items-center px-2 py-1 bg-gray-100 rounded-full"
            onPress={() => handleDelete(task.id!)}
            disabled={deleteLoadingId === task.id}
          >
            {deleteLoadingId === task.id ? (
              <ActivityIndicator size="small" color="#ef4444" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={16} color="#ef4444" />
                <Text className="ml-1 text-xs text-red-500">Delete</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Show loading spinner initially
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500 text-base">Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <View className="px-4 pt-16 pb-4">
        <Text className="text-3xl font-bold text-blue-600 mb-1">Recent Tasks</Text>
        <Text className="text-base text-gray-900">Manage and track your daily tasks</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id!}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-12">
            <Ionicons name="document-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg font-medium mt-4">No tasks found</Text>
            <Text className="text-gray-400 text-sm mt-2 text-center px-8">
              Start by creating your first task
            </Text>
          </View>
        )}
      />

      
    </View>
  );
}
