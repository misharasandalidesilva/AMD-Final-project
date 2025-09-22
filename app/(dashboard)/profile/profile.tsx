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
import { User, Sun, Moon } from 'lucide-react-native';

const Profile = ({ 
  user, 
  stats, 
  darkMode, 
  setDarkMode 
}) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#111827' : '#f9fafb' }}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={{ padding: 20 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 24,
            textAlign: 'center',
            color: darkMode ? 'white' : '#1f2937'
          }}>
            Profile
          </Text>

          <View style={{ gap: 20 }}>
            
            {/* User Info Card */}
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
                padding: 24
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <LinearGradient
                    colors={['#3b82f6', '#8b5cf6']}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16
                    }}
                  >
                    <User color="white" size={40} />
                  </LinearGradient>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: darkMode ? 'white' : '#1f2937',
                      marginBottom: 4
                    }}>
                      {user?.name}
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}>
                      {user?.email}
                    </Text>
                  </View>
                </View>
              </View>
            </BlurView>

            {/* Stats Grid */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {[
                { title: 'Total Tasks', value: stats.total, color: '#3b82f6' },
                { title: 'Completed', value: stats.completed, color: '#10b981' },
                { title: 'Active', value: stats.active, color: '#f59e0b' },
                { title: 'High Priority', value: stats.highPriority, color: '#ef4444' }
              ].map((stat, index) => (
                <BlurView
                  key={index}
                  intensity={darkMode ? 60 : 40}
                  tint={darkMode ? "dark" : "light"}
                  style={{
                    flex: 1,
                    minWidth: 150,
                    borderRadius: 16,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: darkMode ? '#374151' : '#e5e7eb'
                  }}
                >
                  <View style={{
                    backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    padding: 20,
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: stat.color,
                      marginBottom: 4
                    }}>
                      {stat.value}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: darkMode ? '#9ca3af' : '#6b7280',
                      textAlign: 'center'
                    }}>
                      {stat.title}
                    </Text>
                  </View>
                </BlurView>
              ))}
            </View>

            {/* Settings Card */}
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
                padding: 24
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: darkMode ? 'white' : '#1f2937',
                  marginBottom: 20
                }}>
                  Settings
                </Text>
                
                {/* Theme Toggle */}
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: darkMode ? 'white' : '#1f2937'
                  }}>
                    Theme
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => setDarkMode(false)}
                      activeOpacity={0.7}
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: !darkMode ? '#fbbf24' : (darkMode ? '#4b5563' : '#e5e7eb')
                      }}
                    >
                      <Sun 
                        color={!darkMode ? 'white' : (darkMode ? '#9ca3af' : '#6b7280')} 
                        size={20} 
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setDarkMode(true)}
                      activeOpacity={0.7}
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: darkMode ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <Moon 
                        color={darkMode ? 'white' : '#6b7280'} 
                        size={20} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Additional Settings Options */}
                <View style={{ marginTop: 20, gap: 16 }}>
                  {[
                    'Notifications',
                    'Export Data',
                    'Privacy Settings',
                    'About'
                  ].map((setting, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: 12,
                        backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 0.5)'
                      }}
                    >
                      <Text style={{
                        fontSize: 16,
                        color: darkMode ? '#d1d5db' : '#374151'
                      }}>
                        {setting}
                      </Text>
                      <Text style={{
                        fontSize: 18,
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        →
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </BlurView>

            {/* App Info */}
            <View style={{
              alignItems: 'center',
              paddingVertical: 20
            }}>
              <Text style={{
                fontSize: 14,
                color: darkMode ? '#6b7280' : '#9ca3af',
                marginBottom: 4
              }}>
                TODO App
              </Text>
              <Text style={{
                fontSize: 12,
                color: darkMode ? '#6b7280' : '#9ca3af'
              }}>
                Version 1.0.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;