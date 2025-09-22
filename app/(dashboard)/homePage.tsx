import React from 'react';
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

const Dashboard = ({ 
  user, 
  tasks, 
  stats, 
  unreadNotifications, 
  darkMode, 
  setDarkMode, 
  setCurrentView, 
  setShowAddModal, 
  setShowNotificationModal, 
  toggleTask 
}) => {

  const getPriorityColor = (priority) => {
    const colors = {
      high: ['#fed7aa', '#fca5a5'],
      medium: ['#fde68a', '#f59e0b'],
      low: ['#bbf7d0', '#10b981']
    };
    return colors[priority] || ['#e5e7eb', '#6b7280'];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#f9fafb' }}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6', '#6366f1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: 20, paddingVertical: 32 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>
                Welcome back, {user?.name}! 👋
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
                Here's what's happening with your tasks today
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setShowNotificationModal(true)}
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <CheckCircle2 color="white" size={24} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                  {stats.completed}
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
                  {stats.active}
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
                  {stats.highPriority}
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
                  {Math.round((stats.completed / stats.total) * 100) || 0}%
                </Text>
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Progress</Text>
            </BlurView>
          </View>
        </LinearGradient>

        {/* Content Section */}
        <View style={{ padding: 20, paddingBottom: 100 }}>
          {/* Quick Actions */}
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            marginBottom: 16,
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            {[
              { icon: CheckCircle2, title: 'View Tasks', desc: 'Manage your todo list', color: '#3b82f6', onPress: () => setCurrentView('tasks') },
              { icon: Calendar, title: 'Calendar', desc: 'Schedule and deadlines', color: '#8b5cf6', onPress: () => setCurrentView('calendar') },
              { icon: Plus, title: 'Add Task', desc: 'Create new task', color: '#10b981', onPress: () => setShowAddModal(true) },
              { icon: User, title: 'Profile', desc: 'Account settings', color: '#f59e0b', onPress: () => setCurrentView('profile') }
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  minWidth: 150,
                  backgroundColor: darkMode ? '#374151' : 'white',
                  borderRadius: 16,
                  padding: 24,
                  borderWidth: 2,
                  borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                  alignItems: 'center'
                }}
              >
                <action.icon color={action.color} size={32} style={{ marginBottom: 12 }} />
                <Text style={{
                  fontWeight: '600',
                  fontSize: 16,
                  marginBottom: 4,
                  color: darkMode ? 'white' : '#1f2937'
                }}>
                  {action.title}
                </Text>
                <Text style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}>
                  {action.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Tasks */}
          <View style={{
            backgroundColor: darkMode ? '#374151' : 'white',
            borderRadius: 16,
            padding: 24,
            borderWidth: 2,
            borderColor: darkMode ? '#4b5563' : '#e5e7eb'
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: darkMode ? 'white' : '#1f2937'
              }}>
                Recent Tasks
              </Text>
              <TouchableOpacity onPress={() => setCurrentView('tasks')}>
                <Text style={{ color: '#3b82f6', fontSize: 14, fontWeight: '500' }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {tasks.slice(0, 3).map(task => (
              <View key={task.id} style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                backgroundColor: darkMode ? '#4b5563' : '#f9fafb',
                borderRadius: 12,
                marginBottom: 12
              }}>
                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: task.completed ? '#10b981' : '#d1d5db',
                    backgroundColor: task.completed ? '#10b981' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}
                >
                  {task.completed && <Check color="white" size={12} />}
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontWeight: '500',
                    color: darkMode ? 'white' : '#1f2937',
                    textDecorationLine: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.6 : 1
                  }}>
                    {task.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    {task.category}
                  </Text>
                </View>
                <LinearGradient
                  colors={getPriorityColor(task.priority)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;