import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { CheckCircle2, TrendingUp, Calendar, UserPlus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#60A5FA', '#8B5CF6', '#4F46E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 relative"
      >
        {/* Background Blur Circles */}
        <View className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full" />
        <View className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full" />
        <View className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Content */}
        <View className="flex-1 justify-center items-center px-6 z-10">
          <View className="items-center mb-12">
            <View className="w-24 h-24 bg-white/20 rounded-3xl justify-center items-center mb-6">
              <CheckCircle2 size={56} color="white" />
            </View>
            
            <Text className="text-5xl sm:text-6xl font-bold text-white mb-6 text-center">
              TaskMaster
            </Text>
            
            <Text className="text-xl text-white/90 text-center leading-relaxed mb-10 max-w-sm">
              Organize your life, boost productivity, and achieve your goals with our task management system.
            </Text>
          </View>

          {/* Features */}
          <View className="flex-row flex-wrap justify-center gap-6 mb-12 max-w-2xl">
            <View className="bg-white/10 rounded-2xl p-6 items-center min-w-[160px] flex-1 max-w-[200px]">
              <TrendingUp size={32} color="white" className="mb-4" />
              <Text className="text-lg font-semibold text-white mb-2 text-center">
                Boost Productivity
              </Text>
              <Text className="text-sm text-white/80 text-center">
                Track and complete tasks efficiently
              </Text>
            </View>
            
            <View className="bg-white/10 rounded-2xl p-6 items-center min-w-[160px] flex-1 max-w-[200px]">
              <Calendar size={32} color="white" className="mb-4" />
              <Text className="text-lg font-semibold text-white mb-2 text-center">
                Smart Scheduling
              </Text>
              <Text className="text-sm text-white/80 text-center">
                Never miss important deadlines
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            className="bg-white flex-row items-center justify-center px-10 py-4 rounded-2xl shadow-xl active:scale-95"
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <UserPlus size={20} color="#8B5CF6" className="mr-3" />
            <Text className="text-purple-600 font-semibold text-base">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WelcomePage;