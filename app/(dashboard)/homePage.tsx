import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Alert,
  GestureResponderEvent
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Plus, 
  Bell, 
  Check, 
  Calendar, 
  User, 
  Sun, 
  Moon, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const user = { name: 'Mishara' };
  const unreadNotifications = 3;

 
  function handleNotificationModal(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#f9fafb', paddingTop: 27}}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6', '#6366f1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: 20, paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>
                Welcome back, {user.name}! 👋
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
                Here's what's happening with your tasks today
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={handleNotificationModal}
                style={{
                  padding: 12,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 50,
                  position: 'relative'
                }}
              >
                <Bell color="white" size={24} />
                {unreadNotifications > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: '#ef4444',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                      {unreadNotifications}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDarkMode(!darkMode)}
                style={{
                  padding: 12,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 50
                }}
              >
                {darkMode ? <Sun color="white" size={24} /> : <Moon color="white" size={24} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            <BlurView intensity={20} tint="light" style={{
              flex: 1,
              minWidth: 150,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 16,
              overflow: 'hidden'
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <CheckCircle2 color="white" size={24} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                 
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Completed</Text>
            </BlurView>

            <BlurView intensity={20} tint="light" style={{
              flex: 1,
              minWidth: 150,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 16,
              overflow: 'hidden'
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Clock color="white" size={24} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                 
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Active</Text>
            </BlurView>

            <BlurView intensity={20} tint="light" style={{
              flex: 1,
              minWidth: 150,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 16,
              overflow: 'hidden'
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <AlertCircle color="white" size={24} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                  
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>High Priority</Text>
            </BlurView>

            <BlurView intensity={20} tint="light" style={{
              flex: 1,
              minWidth: 150,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 16,
              overflow: 'hidden'
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <TrendingUp color="white" size={24} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Progress</Text>
            </BlurView>
          </View>
        </LinearGradient>

        {/* Content Section */}
        <View style={{ padding: 20, paddingBottom: 43, marginBottom: 10 }}>
          {/* Quick Actions */}
          <Text style={{ 
            fontSize: 22, 
            fontWeight: 'bold', 
            marginBottom: 28,
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Quick Actions
          </Text>
          
          <View className="flex-row flex-wrap gap-4 mb-8">
      
      {/* View Tasks */}
      <TouchableOpacity
        onPress={() => router.push("/view/viewtasks")}
        activeOpacity={0.7}
        className={`flex-1 min-w-[150px] rounded-2xl p-6 border-2 items-center ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CheckCircle2 color="#3b82f6" size={32} className="mb-3" />
        <Text
          className={`font-semibold text-base mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          View Tasks
        </Text>
        <Text
          className={`text-xs text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage your todo list
        </Text>
      </TouchableOpacity>

      {/* Calendar */}
      <TouchableOpacity
        onPress={() => router.push("/calender/calender")} 
        activeOpacity={0.7}
        className={`flex-1 min-w-[150px] rounded-2xl p-6 border-2 items-center ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <Calendar color="#8b5cf6" size={32} className="mb-3" />
        <Text
          className={`font-semibold text-base mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Calendar
        </Text>
        <Text
          className={`text-xs text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Schedule and deadlines
        </Text>
      </TouchableOpacity>

      {/* Add Task */}
      <TouchableOpacity
        onPress={() => router.push("/task/task")}
        activeOpacity={0.7}
        className={`flex-1 min-w-[150px] rounded-2xl p-6 border-2 items-center ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <Plus color="#10b981" size={32} className="mb-3" />
        <Text
          className={`font-semibold text-base mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Add Task
        </Text>
        <Text
          className={`text-xs text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Create new task
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        onPress={() => router.push("/profile/profile")}
        activeOpacity={0.7}
        className={`flex-1 min-w-[150px] rounded-2xl p-6 border-2 items-center ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <User color="#f59e0b" size={32} className="mb-3" />
        <Text
          className={`font-semibold text-base mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Profile
        </Text>
        <Text
          className={`text-xs text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Account settings
        </Text>
      </TouchableOpacity>
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;