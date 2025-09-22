import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Plus, 
  Bell, 
  Check, 
  Search, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Tasks = ({ 
  tasks, 
  stats, 
  unreadNotifications, 
  darkMode, 
  toggleTask, 
  deleteTask, 
  startEditTask, 
  setShowAddModal, 
  setShowNotificationModal 
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityColor = (priority) => {
    const colors = {
      high: ['#fed7aa', '#fca5a5'],
      medium: ['#fde68a', '#f59e0b'],
      low: ['#bbf7d0', '#10b981']
    };
    return colors[priority] || ['#e5e7eb', '#6b7280'];
  };

  const getCategoryColor = (category) => {
    const colors = {
      Work: darkMode ? { bg: '#1e3a8a', text: '#bfdbfe' } : { bg: '#dbeafe', text: '#1d4ed8' },
      Personal: darkMode ? { bg: '#581c87', text: '#c4b5fd' } : { bg: '#e9d5ff', text: '#7c3aed' },
      Health: darkMode ? { bg: '#14532d', text: '#bbf7d0' } : { bg: '#dcfce7', text: '#16a34a' }
    };
    return colors[category] || (darkMode ? { bg: '#374151', text: '#d1d5db' } : { bg: '#f3f4f6', text: '#374151' });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesTab = activeTab === 'all' || 
                       (activeTab === 'active' && !task.completed) || 
                       (activeTab === 'completed' && task.completed);
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tasks, activeTab, searchQuery]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#f9fafb' }}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#bfdbfe', '#c4b5fd', '#c7d2fe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>
              My Tasks
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18 }}>
              {stats.active} tasks remaining
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowNotificationModal(true)}
            style={{
              padding: 12,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 50,
              position: 'relative'
            }}
          >
            <Bell color="white" size={28} />
            {unreadNotifications > 0 && (
              <BlurView intensity={80} tint="light" style={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: '#ef4444',
                borderRadius: 12,
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                  {unreadNotifications}
                </Text>
              </BlurView>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={{ position: 'relative' }}>
          <Search 
            color="rgba(255,255,255,0.7)" 
            size={20} 
            style={{ position: 'absolute', left: 16, top: 16, zIndex: 1 }}
          />
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              paddingLeft: 48,
              paddingRight: 16,
              paddingVertical: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              fontSize: 16
            }}
          />
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={{ 
        backgroundColor: darkMode ? '#374151' : 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? '#4b5563' : '#e5e7eb'
      }}>
        <View style={{
          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
          borderRadius: 16,
          padding: 4,
          flexDirection: 'row'
        }}>
          {['all', 'active', 'completed'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent'
              }}
            >
              <Text style={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 14,
                color: activeTab === tab ? 'white' : (darkMode ? '#9ca3af' : '#6b7280')
              }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({
                  tab === 'all' ? stats.total : 
                  tab === 'active' ? stats.active : 
                  stats.completed
                })
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tasks List */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.map(task => (
          <BlurView
            key={task.id}
            intensity={task.completed ? 60 : 40}
            tint={darkMode ? "dark" : "light"}
            style={{
              borderRadius: 16,
              marginBottom: 16,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: task.completed 
                ? (darkMode ? '#16a34a' : '#bbf7d0') 
                : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
            }}
          >
            <View style={{
              backgroundColor: task.completed 
                ? (darkMode ? 'rgba(22, 163, 74, 0.2)' : 'rgba(187, 247, 208, 0.3)')
                : (darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
              padding: 20
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    borderWidth: 2,
                    borderColor: task.completed ? '#16a34a' : '#d1d5db',
                    backgroundColor: task.completed ? '#16a34a' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    marginTop: 2
                  }}
                >
                  {task.completed && <Check color="white" size={16} />}
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: task.completed 
                          ? '#6b7280' 
                          : (darkMode ? 'white' : '#1f2937'),
                        textDecorationLine: task.completed ? 'line-through' : 'none',
                        marginBottom: 4
                      }}>
                        {task.title}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: task.completed 
                          ? '#9ca3af' 
                          : (darkMode ? '#d1d5db' : '#6b7280'),
                        textDecorationLine: task.completed ? 'line-through' : 'none',
                        marginBottom: 12,
                        lineHeight: 20
                      }}>
                        {task.description}
                      </Text>
                      
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <LinearGradient
                            colors={getPriorityColor(task.priority)}
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              marginRight: 8
                            }}
                          />
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: darkMode ? '#9ca3af' : '#6b7280',
                            textTransform: 'capitalize'
                          }}>
                            {task.priority}
                          </Text>
                        </View>
                        
                        <View style={{
                          backgroundColor: getCategoryColor(task.category).bg,
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          borderRadius: 12
                        }}>
                          <Text style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: getCategoryColor(task.category).text
                          }}>
                            {task.category}
                          </Text>
                        </View>
                        
                        {task.dueDate && (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Calendar color={darkMode ? '#9ca3af' : '#6b7280'} size={12} style={{ marginRight: 4 }} />
                            <Text style={{
                              fontSize: 12,
                              color: darkMode ? '#9ca3af' : '#6b7280'
                            }}>
                              {task.dueDate}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => startEditTask(task)}
                        style={{
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'
                        }}
                      >
                        <Edit3 color={darkMode ? '#60a5fa' : '#3b82f6'} size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteTask(task.id)}
                        style={{
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'
                        }}
                      >
                        <Trash2 color={darkMode ? '#f87171' : '#ef4444'} size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </BlurView>
        ))}
        
        {filteredTasks.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <Clock color="#9ca3af" size={64} style={{ marginBottom: 16 }} />
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8
            }}>
              No tasks found
            </Text>
            <Text style={{ color: '#9ca3af', textAlign: 'center' }}>
              Add a new task to get started!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#3b82f6',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8
        }}
      >
        <Plus color="white" size={32} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Tasks;