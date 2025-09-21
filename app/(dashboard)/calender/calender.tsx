import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Theme, NewTaskDetails } from './types';

interface CalendarProps {
  currentMonth: Date;
  darkMode: boolean;
  theme: Theme;
  navigateMonth: (direction: number) => void;
  setNewTaskDetails: React.Dispatch<React.SetStateAction<NewTaskDetails>>;
  setShowAddModal: (show: boolean) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  darkMode,
  theme,
  navigateMonth,
  setNewTaskDetails,
  setShowAddModal
}) => {

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: JSX.Element[] = [];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Empty cells for alignment
  for (let i = 0; i < firstDay; i++) {
    days.push(<View key={`empty-${i}`} className="h-10 sm:h-12 w-10 sm:w-12" />);
  }

  // Days cells
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isToday = date.toDateString() === new Date().toDateString();

    days.push(
      <TouchableOpacity
        key={day}
        onPress={() => {
          setNewTaskDetails(prev => ({ ...prev, dueDate: formatDate(date) }));
          setShowAddModal(true);
        }}
        className={`h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg ${
          isToday 
            ? 'bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg'
            : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')
        }`}
      >
        <Text className={`text-xs sm:text-sm ${isToday ? 'text-white font-bold' : ''}`}>{day}</Text>
      </TouchableOpacity>
    );
  }

  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <ScrollView className={`${theme.bg} flex-1`}>
      <View className="p-4 sm:p-6 lg:p-8 pb-24">
        <Text className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center lg:text-left`}>
          Calendar
        </Text>

        <View className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2`}>
          {/* Month Navigation */}
          <View className="flex-row justify-between items-center mb-4 sm:mb-6">
            <TouchableOpacity 
              onPress={() => navigateMonth(-1)} 
              className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <ChevronLeft size={20} color={darkMode ? 'white' : 'black'} />
            </TouchableOpacity>

            <Text className="text-lg sm:text-xl font-bold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>

            <TouchableOpacity 
              onPress={() => navigateMonth(1)} 
              className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <ChevronRight size={20} color={darkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>

          {/* Weekdays */}
          <View className="flex-row justify-between mb-2 sm:mb-4">
            {weekDays.map(day => (
              <View key={day} className="h-8 sm:h-10 w-10 sm:w-12 items-center justify-center">
                <Text className="text-xs sm:text-sm font-medium text-gray-500">{day}</Text>
              </View>
            ))}
          </View>

          {/* Days Grid */}
          <View className="flex-row flex-wrap justify-start">{days}</View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Calendar;
