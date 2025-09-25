import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import Task from '@/type/task';
import { deletetask } from '@/service/TaskService';

export default function TaskViewScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    else if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    else return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work': return 'briefcase';
      case 'personal': return 'person';
      case 'health': return 'heart';
      default: return 'document';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return '#3b82f6';
      case 'personal': return '#8b5cf6';
      case 'health': return '#ec4899';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
      const alltasks = querySnapshot.docs
        .filter((doc) => doc.data().uId === auth.currentUser?.uid)
        .map((doc) => ({ ...doc.data(), id: doc.id } as Task))
        .sort((a, b) => {
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      setTasks(alltasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (taskId: string, taskTitle: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${taskTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleteLoadingId(taskId);
              await deletetask(taskId);
              setDeleteLoadingId(null);
            } catch (error) {
              console.error('Error deleting task: ', error);
              Alert.alert('Error', 'Failed to delete task. Please try again.');
              setDeleteLoadingId(null);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (taskId: string) => {
    router.push(`/task/task?id=${taskId}`);
  };

  const renderTaskCard = ({ item: task }: { item: Task }) => (
    <View
      className={`bg-white rounded-2xl p-5 mb-4 mx-4 shadow-lg border-l-4 ${
        task.completed
          ? 'opacity-70 border-gray-400'
          : task.priority === 'high'
          ? 'border-red-500'
          : task.priority === 'medium'
          ? 'border-yellow-500'
          : 'border-green-500'
      }`}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text
            className={`text-lg font-bold mb-1 ${
              task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
          >
            {task.title}
          </Text>
          {task.description ? (
            <Text
              className={`text-sm leading-5 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          ) : null}
        </View>

        <View
          className={`flex-row items-center px-2 py-1 rounded-full ${
            task.completed ? 'bg-gray-100' : 'bg-blue-50'
          }`}
        >
          <Ionicons
            name={getCategoryIcon(task.category)}
            size={12}
            color={task.completed ? '#9ca3af' : getCategoryColor(task.category)}
          />
          <Text
            className={`ml-1 text-xs font-medium capitalize ${
              task.completed ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {task.category}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <View
            className={`w-2 h-2 rounded-full mr-2`}
            style={{ backgroundColor: task.completed ? '#9ca3af' : getPriorityColor(task.priority) }}
          />
          <Text
            className={`text-xs font-medium capitalize ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {task.priority} Priority
          </Text>
        </View>

        {task.completed && (
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={14} color="#10b981" />
            <Text className="ml-1 text-xs text-green-600 font-medium">Completed</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <Ionicons
            name="calendar-outline"
            size={14}
            color={task.completed ? '#9ca3af' : '#6b7280'}
          />
          <Text
            className={`ml-2 text-sm font-medium ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {formatDate(task.date)}
          </Text>
        </View>

        <View className="flex-row space-x-2">
          <TouchableOpacity
            className="flex-row items-center px-3 py-2 bg-blue-50 rounded-lg active:bg-blue-100"
            onPress={() => handleEdit(task.id!)}
            disabled={deleteLoadingId === task.id}
          >
            <Ionicons name="create-outline" size={16} color="#3b82f6" />
            <Text className="ml-1 text-xs text-blue-600 font-medium">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-3 py-2 bg-red-50 rounded-lg active:bg-red-100"
            onPress={() => handleDelete(task.id!, task.title)}
            disabled={deleteLoadingId === task.id}
          >
            {deleteLoadingId === task.id ? (
              <ActivityIndicator size="small" color="#ef4444" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={16} color="#ef4444" />
                <Text className="ml-1 text-xs text-red-500 font-medium">Delete</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSummaryStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const highPriorityTasks = tasks.filter(t => !t.completed && t.priority === 'high').length;

    return (
      <View className="mx-4 mb-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">{totalTasks}</Text>
              <Text className="text-xs text-gray-500 font-medium">Total</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">{completedTasks}</Text>
              <Text className="text-xs text-gray-500 font-medium">Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-orange-600">{pendingTasks}</Text>
              <Text className="text-xs text-gray-500 font-medium">Pending</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-red-600">{highPriorityTasks}</Text>
              <Text className="text-xs text-gray-500 font-medium">Urgent</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-500 text-base font-medium">Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id!}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Back Button + Header */}
            <View className="px-4 pt-12 pb-2 flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push('/(dashboard)/homePage')}
                className="p-2 rounded-full bg-white/80 active:scale-95 shadow-md"
              >
                <Ionicons name="chevron-back" size={24} color="#3b82f6" />
              </TouchableOpacity>
              <Text className="text-3xl font-bold text-blue-700 ml-4">Recent Tasks</Text>
            </View>

            {/* Subheading */}
            <View className="px-4 pb-4">
              <Text className="text-xl text-gray-900">Manage and track your daily tasks</Text>
            </View>

            {/* Summary Stats */}
            {tasks.length > 0 && renderSummaryStats()}

            {/* Section Title */}
            {tasks.length > 0 && (
              <View className="px-4 mb-2">
                <Text className="text-lg font-semibold text-gray-800">Recent Tasks</Text>
              </View>
            )}
          </>
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-16 px-8">
            <View className="bg-white/80 rounded-full p-6 mb-4">
              <Ionicons name="document-text-outline" size={48} color="#d1d5db" />
            </View>
            <Text className="text-gray-500 text-xl font-semibold mb-2">No tasks yet</Text>
            <Text className="text-gray-400 text-sm text-center leading-5">
              Start by creating your first task to stay organized and productive
            </Text>
            
            {/* <TouchableOpacity
              className="mt-6 bg-blue-500 px-6 py-3 rounded-xl flex-row items-center shadow-lg active:scale-95"
              onPress={() => router.push('/form/taskform')}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text className="ml-2 text-white font-semibold">Create First Task</Text>
            </TouchableOpacity> */}
          </View>
        )}
        contentContainerStyle={{ 
          paddingBottom: 100,
          flexGrow: 1 
        }}
        refreshing={loading}
        onRefresh={() => {}}
      />
    </View>
  );
}
