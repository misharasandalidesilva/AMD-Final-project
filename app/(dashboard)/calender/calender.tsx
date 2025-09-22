import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const Calendar = ({ 
  darkMode = false, 
  setNewTaskDetails = (p0: (prev: any) => any) => {}, 
  setShowAddModal = (p0: boolean) => {} 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: React.ReactNode[] = [];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Empty slots for first week
  for (let i = 0; i < firstDay; i++) {
    days.push(<View key={`empty-${i}`} style={{ height: 48, flex: 1 }} />);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isToday = date.toDateString() === new Date().toDateString();

    days.push(
      <TouchableOpacity
        key={day}
        onPress={() => {
          setNewTaskDetails((prev: any) => ({ ...prev, dueDate: formatDate(date) }));
          setShowAddModal(true);
        }}
        activeOpacity={0.7}
        style={{
          height: 48,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          margin: 1,
          backgroundColor: isToday ? '#3b82f6' : 'transparent'
        }}
      >
        <Text style={{
          fontSize: 14,
          fontWeight: isToday ? 'bold' : 'normal',
          color: isToday ? 'white' : (darkMode ? '#d1d5db' : '#374151')
        }}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#f9fafb' }}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ padding: 20 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 24,
            textAlign: 'center',
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Calendar
          </Text>

          <BlurView
            intensity={darkMode ? 60 : 40}
            tint={darkMode ? "dark" : "light"}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: darkMode ? '#374151' : '#e5e7eb'
            }}
          >
            <View style={{
              backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              padding: 20
            }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <TouchableOpacity 
                  onPress={() => navigateMonth(-1)}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(243, 244, 246, 0.8)'
                  }}
                >
                  <ChevronLeft color={darkMode ? '#d1d5db' : '#374151'} size={20} />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, fontWeight: 'bold', color: darkMode ? 'white' : '#1f2937' }}>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </Text>

                <TouchableOpacity 
                  onPress={() => navigateMonth(1)}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(243, 244, 246, 0.8)'
                  }}
                >
                  <ChevronRight color={darkMode ? '#d1d5db' : '#374151'} size={20} />
                </TouchableOpacity>
              </View>

              {/* Days labels */}
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
                  <View key={day} style={{ flex: 1, alignItems: 'center', paddingVertical: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#6b7280' }}>{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View>
                {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                  <View key={weekIndex} style={{ flexDirection: 'row', marginBottom: 4 }}>
                    {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                      <View key={dayIndex} style={{ flex: 1 }}>{day}</View>
                    ))}
                    {days.slice(weekIndex * 7, (weekIndex + 1) * 7).length < 7 &&
                      Array.from({ length: 7 - days.slice(weekIndex * 7, (weekIndex + 1) * 7).length }).map((_, emptyIndex) => (
                        <View key={`empty-end-${emptyIndex}`} style={{ flex: 1, height: 48 }} />
                      ))
                    }
                  </View>
                ))}
              </View>
            </View>
          </BlurView>

          {/* Instructions */}
          <BlurView
            intensity={40}
            tint={darkMode ? "dark" : "light"}
            style={{ marginTop: 24, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)' }}
          >
            <LinearGradient
              colors={darkMode ? ['rgba(29, 78, 216, 0.3)', 'rgba(37, 99, 235, 0.2)'] : ['rgba(219, 234, 254, 0.8)', 'rgba(191, 219, 254, 0.6)']}
              style={{ padding: 16 }}
            >
              <Text style={{ fontSize: 14, textAlign: 'center', color: darkMode ? '#93c5fd' : '#1d4ed8', fontWeight: '500' }}>
                Click on any date to create a new task for that day
              </Text>
            </LinearGradient>
          </BlurView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;
