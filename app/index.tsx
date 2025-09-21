import React from 'react';
import { CheckCircle2, TrendingUp, Calendar, Activity, UserPlus } from 'lucide-react';
import { useRouter } from 'expo-router';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center">
      {/* Background Blur Circles */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm mb-6 mx-auto">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            TaskMaster
          </h1>
          <p className="text-xl sm:text-2xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Organize your life, boost productivity, and achieve your goals with our task management system.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <TrendingUp className="w-8 h-8 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Boost Productivity</h3>
            <p className="text-sm text-white text-opacity-80">Track and complete tasks efficiently</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <Calendar className="w-8 h-8 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-sm text-white text-opacity-80">Never miss important deadlines</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <Activity className="w-8 h-8 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-white text-opacity-80">Monitor your daily achievements</p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push('/(auth)/login')}
            className="group px-10 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
          >
            <UserPlus className="w-5 h-5" />
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;