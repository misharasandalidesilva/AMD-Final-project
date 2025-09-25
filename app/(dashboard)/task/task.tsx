import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addTask } from '@/service/TaskService';
import { useRouter } from 'expo-router';

export default function TaskFormScreen() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    date: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  // calendar month/year state
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const priorities = [
    { value: 'high', label: 'High', color: '#ef4444', icon: 'alert-circle' },
    { value: 'medium', label: 'Medium', color: '#f59e0b', icon: 'remove-circle' },
    { value: 'low', label: 'Low', color: '#10b981', icon: 'checkmark-circle' },
  ];

  const categories = [
    { value: 'work', label: 'Work', icon: 'briefcase', color: '#3b82f6' },
    { value: 'personal', label: 'Personal', icon: 'person', color: '#8b5cf6' },
    { value: 'health', label: 'Health', icon: 'heart', color: '#ec4899' },
  ];

  function handleInputChange(key: string, value: string) {
    setTask((prev) => ({ ...prev, [key]: value }));
  }

  const generateCalendarDates = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const dates: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) dates.push(null);
    for (let day = 1; day <= daysInMonth; day++) dates.push(new Date(year, month, day));
    return dates;
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isToday = (date: Date) => new Date().toDateString() === date.toDateString();
  const isSelectedDate = (date: Date) => formatDate(date) === task.date;

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      Alert.alert('Validation Error', 'Task title is required.');
      return;
    }

    try {
      setLoading(true);
      await addTask({
        title: task.title,
        description: task.description,
        priority: task.priority as 'high' | 'medium' | 'low',
        category: task.category as 'work' | 'personal' | 'health',
        date: task.date,
        completed: false,
      });
      setLoading(false);
      Alert.alert('Success', 'Task added successfully!');
      router.push('/view/viewtasks');
    } catch (error) {
      setLoading(false);
      console.error('Error adding task:', error);
      Alert.alert('Error', 'There was an error adding the task. Please try again.');
    }
  };

  const getPriorityDisplay = () => priorities.find((p) => p.value === task.priority) ?? priorities[1];
  const getCategoryDisplay = () => categories.find((c) => c.value === task.category) ?? categories[1];

  // Calendar Modal with fixed height
  const renderDateModal = () => {
    const calendarDates = generateCalendarDates(calendarMonth, calendarYear);
    const monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];

    return (
      <Modal visible={showDateModal} transparent animationType="slide" onRequestClose={() => setShowDateModal(false)}>
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            style={{ height: 450 }} // fixed height to avoid resizing
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity
                onPress={() => {
                  if (calendarMonth === 0) {
                    setCalendarMonth(11);
                    setCalendarYear(calendarYear - 1);
                  } else setCalendarMonth(calendarMonth - 1);
                }}
              >
                <Ionicons name="chevron-back" size={24} color="#6b7280" />
              </TouchableOpacity>

              <Text className="text-xl font-bold text-gray-800">
                {monthNames[calendarMonth]} {calendarYear}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (calendarMonth === 11) {
                    setCalendarMonth(0);
                    setCalendarYear(calendarYear + 1);
                  } else setCalendarMonth(calendarMonth + 1);
                }}
              >
                <Ionicons name="chevron-forward" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Days */}
            <View className="flex-row mb-2">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => (
                <View key={day} className="flex-1 items-center py-2">
                  <Text className="text-xs font-semibold text-gray-500">{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View className="flex-row flex-wrap">
              {calendarDates.map((date, index) => (
                <View key={index} className="w-1/7 aspect-square p-1" style={{ width: '14.28%' }}>
                  {date ? (
                    <TouchableOpacity
                      className={`flex-1 items-center justify-center rounded-lg ${
                        isSelectedDate(date) ? 'bg-blue-500' : isToday(date) ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 active:bg-gray-100'
                      }`}
                      onPress={() => {
                        handleInputChange('date', formatDate(date));
                        setShowDateModal(false);
                      }}
                    >
                      <Text className={`text-sm font-medium ${isSelectedDate(date) ? 'text-white' : isToday(date) ? 'text-blue-600' : 'text-gray-800'}`}>
                        {date.getDate()}
                      </Text>
                    </TouchableOpacity>
                  ) : <View className="flex-1" />}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPriorityModal = () => (
    <Modal visible={showPriorityModal} transparent animationType="slide" onRequestClose={() => setShowPriorityModal(false)}>
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-xl font-bold text-gray-800 text-center mb-6">Select Priority</Text>
          {priorities.map((priority) => (
            <TouchableOpacity
              key={priority.value}
              className="flex-row items-center p-4 rounded-xl mb-2 bg-gray-50 active:bg-gray-100"
              onPress={() => {
                handleInputChange('priority', priority.value);
                setShowPriorityModal(false);
              }}
            >
              <Ionicons name={priority.icon} size={20} color={priority.color} />
              <Text className="ml-3 text-base font-medium text-gray-800">{priority.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity className="mt-4 p-3 items-center" onPress={() => setShowPriorityModal(false)}>
            <Text className="text-gray-500 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderCategoryModal = () => (
    <Modal visible={showCategoryModal} transparent animationType="slide" onRequestClose={() => setShowCategoryModal(false)}>
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-xl font-bold text-gray-800 text-center mb-6">Select Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              className="flex-row items-center p-4 rounded-xl mb-2 bg-gray-50 active:bg-gray-100"
              onPress={() => {
                handleInputChange('category', category.value);
                setShowCategoryModal(false);
              }}
            >
              <Ionicons name={category.icon} size={20} color={category.color} />
              <Text className="ml-3 text-base font-medium text-gray-800">{category.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity className="mt-4 p-3 items-center" onPress={() => setShowCategoryModal(false)}>
            <Text className="text-gray-500 text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }} bounces={false}>
      {/* Header */}
      <View className="items-center py-16 px-8">
        <Text className="text-3xl font-bold text-blue-600 mb-15 text-center">Add New Task</Text>
        <Text className="text-lg text-gray-900 text-center">Create and organize your tasks efficiently</Text>
      </View>

      {/* Form Container */}
      <View className="bg-white mx-9 rounded-2xl p-4 shadow-xl min-h-[100px] mt-">
        {/* Title Input */}
        <View className="mb-2">
          <View className="flex-row items-center mb-2">
            <Ionicons name="add-circle" size={16} color="#374151" />
            <Text className="ml-2 text-sm font-semibold text-gray-900">Task Title</Text>
          </View>
          <TextInput
            className="border-2 border-gray-400 rounded-xl p-4 text-base text-gray-800 bg-white"
            value={task.title}
            onChangeText={(text) => handleInputChange('title', text)}
            placeholder="Enter task title..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Description Input */}
        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-900 mb-2">Description</Text>
          <TextInput
            className="border-2 border-gray-400 rounded-xl p-4 text-base text-gray-800 bg-white h-24"
            value={task.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Enter task description..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Due Date Selector */}
        <View className="mb-2">
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar" size={16} color="#374151" />
            <Text className="ml-2 text-sm font-semibold text-gray-900">Due Date</Text>
          </View>
          <TouchableOpacity
            className="border-2 border-gray-400 rounded-xl p-4 flex-row justify-between items-center bg-white"
            onPress={() => setShowDateModal(true)}
          >
            <Text className="text-base text-gray-800 font-medium">{formatDisplayDate(task.date)}</Text>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Priority Selector */}
        <View className="mb-2">
          <View className="flex-row items-center mb-2">
            <Ionicons name="flag" size={16} color="#374151" />
            <Text className="ml-2 text-sm font-semibold text-gray-900">Priority</Text>
          </View>
          <TouchableOpacity
            className="border-2 border-gray-400 rounded-xl p-4 flex-row justify-between items-center bg-white"
            onPress={() => setShowPriorityModal(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name={getPriorityDisplay().icon} size={20} color={getPriorityDisplay().color} />
              <Text className="ml-3 text-base text-gray-800 font-medium">{getPriorityDisplay().label}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Category Selector */}
        <View className="mb-2">
          <Text className="text-sm font-semibold text-gray-900 mb-2">Category</Text>
          <TouchableOpacity
            className="border-2 border-gray-400 rounded-xl p-4 flex-row justify-between items-center bg-white"
            onPress={() => setShowCategoryModal(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name={getCategoryDisplay().icon} size={20} color={getCategoryDisplay().color} />
              <Text className="ml-3 text-base text-gray-800 font-medium">{getCategoryDisplay().label}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View className="mt-auto pt-4">
          <TouchableOpacity
             className="bg-blue-400 flex-row items-center justify-center px-10 py-3 rounded-2xl shadow-xl active:scale-95 "
            onPress={handleSubmit}
            disabled={loading}
          >
            <Ionicons name="add" size={22} color="white" />
            <Text className="ml-1 text-white text-base font-bold">
              {loading ? 'Adding Task...' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderDateModal()}
      {renderPriorityModal()}
      {renderCategoryModal()}
    </ScrollView>
  );
}
