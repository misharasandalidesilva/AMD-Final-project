import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addTask } from '@/service/TaskService';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CalendarTaskScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const router = useRouter();

  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    date: '', // string for API
  });

  const [loading, setLoading] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const generateCalendarDates = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const dates = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  };

  const formatDateForApi = (date: Date) => {
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    // keep real date for display
    setSelectedDate(date);
    // store string for API
    setTask(prev => ({
      ...prev,
      date: formatDateForApi(date)
    }));
    setShowTaskForm(true);
  };

  const handleInputChange = (key: string, value: string) => {
    setTask(prev => ({ ...prev, [key]: value }));
  };

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
        priority: task.priority,
        category: task.category,
        date: task.date,
        completed: false,
      });

      Alert.alert('Success', 'Task added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setShowTaskForm(false);
            setTask({
              title: '',
              description: '',
              priority: 'medium',
              category: 'personal',
              date: '',
            });
            setSelectedDate(null);
          }
        }
      ]);
        router.push('/view/viewtasks');
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'There was an error adding the task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateMonth = (direction: string) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getPriorityDisplay = () => {
    return priorities.find(p => p.value === task.priority) || priorities[1];
  };

  const getCategoryDisplay = () => {
    return categories.find(c => c.value === task.category) || categories[1];
  };

  const renderCalendar = () => {
    const calendarDates = generateCalendarDates(currentMonth, currentYear);

    return (
      <View className="bg-white mx-4 rounded-2xl p-5 shadow-lg">
        <View className="flex-row justify-between items-center mb-5">
          <TouchableOpacity
            onPress={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </Text>

          <TouchableOpacity
            onPress={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-gray-100 active:bg-gray-200"
          >
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <View key={day} className="flex-1 items-center py-2">
              <Text className="text-xs font-semibold text-gray-500">{day}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row flex-wrap">
          {calendarDates.map((date, index) => (
            <View key={index} className="w-1/7 aspect-square p-0.5" style={{ width: `${100 / 7}%` }}>
              {date ? (
                <TouchableOpacity
                  className={`flex-1 items-center justify-center rounded-lg ${
                    isSelectedDate(date)
                      ? 'bg-blue-500'
                      : isToday(date)
                      ? 'bg-blue-100 border border-blue-500'
                      : 'bg-transparent active:bg-gray-100'
                  }`}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text
                    className={`text-base font-medium ${
                      isSelectedDate(date)
                        ? 'text-white'
                        : isToday(date)
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-1" />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTaskForm = () => (
    <Modal
      visible={showTaskForm}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowTaskForm(false)}
    >
      <ScrollView className="flex-1 bg-purple-100">
        <View className="flex-row justify-between items-center p-5 border-b border-gray-800 mb-20">
          <TouchableOpacity onPress={() => setShowTaskForm(false)}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">
            {selectedDate && `Add Task for ${selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}`}
          </Text>
          <View className="w-6" />
        </View>

        <View className="bg-white m-4 rounded-2xl p-5 shadow-lg">
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="add-circle" size={16} color="#374151" />
              <Text className="ml-2 text-sm font-semibold text-gray-800">Task Title</Text>
            </View>
            <TextInput
              className="border-2 border-gray-400 rounded-xl p-4 text-base text-gray-800 bg-white"
              value={task.title}
              onChangeText={(text) => handleInputChange('title', text)}
              placeholder="Enter task title..."
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-800 mb-2">Description</Text>
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

          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="flag" size={16} color="#374151" />
              <Text className="ml-2 text-sm font-semibold text-gray-800">Priority</Text>
            </View>
            <TouchableOpacity
              className="border-2 border-gray-400 rounded-xl p-4 flex-row justify-between items-center bg-white"
              onPress={() => setShowPriorityModal(true)}
            >
              <View className="flex-row items-center">
                <Ionicons name={getPriorityDisplay().icon} size={20} color={getPriorityDisplay().color} />
                <Text className="ml-3 text-base text-gray-800 font-medium">
                  {getPriorityDisplay().label}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-800 mb-2">Category</Text>
            <TouchableOpacity
              className="border-2 border-gray-400 rounded-xl p-4 flex-row justify-between items-center bg-white"
              onPress={() => setShowCategoryModal(true)}
            >
              <View className="flex-row items-center">
                <Ionicons name={getCategoryDisplay().icon} size={20} color={getCategoryDisplay().color} />
                <Text className="ml-3 text-base text-gray-800 font-medium">
                  {getCategoryDisplay().label}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className={`${loading ? 'bg-gray-400' : 'bg-blue-500'} rounded-xl p-3 flex-row justify-center items-center shadow-md active:scale-95`}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Ionicons name="add" size={22} color="white" />
            <Text className="ml-2 text-white text-base font-bold">
              {loading ? 'Adding Task...' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Priority Modal */}
      <Modal
        visible={showPriorityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPriorityModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <Text className="text-xl font-bold text-gray-800 text-center mb-6">
              Select Priority
            </Text>
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
                <Text className="ml-3 text-base font-medium text-gray-800">
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="mt-4 p-3 items-center"
              onPress={() => setShowPriorityModal(false)}
            >
              <Text className="text-gray-500 text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <Text className="text-xl font-bold text-gray-800 text-center mb-6">
              Select Category
            </Text>
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
                <Text className="ml-3 text-base font-medium text-gray-800">
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="mt-4 p-3 items-center"
              onPress={() => setShowCategoryModal(false)}
            >
              <Text className="text-gray-500 text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );

  return (
    <ScrollView className="flex-1 bg-purple-100">
      <View className="items-center py-20 px-4 ">
        <Text className="text-3xl font-bold text-blue-500 mb-27 text-center">
           Add Date Calender🗒️
        </Text>
        <Text className="text-base text-gray-800 text-center mb-15 py-4">
          Pick the perfect day to make this task happen and keep your schedule on track.
        </Text>
      </View>

      {renderCalendar()}

      {renderTaskForm()}
    </ScrollView>
  );
}
