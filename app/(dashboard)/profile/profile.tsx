import React from 'react';
import { User, Sun, Moon } from 'lucide-react';
import { User as UserType, Theme, Stats } from './types';

interface ProfileProps {
  user: UserType;
  stats: Stats;
  darkMode: boolean;
  theme: Theme;
  setDarkMode: (mode: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  stats,
  darkMode,
  theme,
  setDarkMode
}) => {
  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <div className="p-4 sm:p-6 lg:p-8 pb-24">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center lg:text-left max-w-6xl mx-auto">Profile</h1>
        <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto">
          {/* User Info Card */}
          <div className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2`}>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{user?.name}</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 text-center`}>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-500">{stats.total}</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>Total Tasks</p>
            </div>
            <div className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 text-center`}>
              <h3 className="text-xl sm:text-2xl font-bold text-green-500">{stats.completed}</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>Completed</p>
            </div>
          </div>

          {/* Settings Card */}
          <div className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2`}>
            <h3 className="text-lg font-bold mb-4">Settings</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Theme</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`p-2 sm:p-3 rounded-xl ${!darkMode ? 'bg-yellow-400 text-white' : (darkMode ? 'bg-gray-700' : 'bg-gray-200')}`}
                >
                  <Sun className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                >
                  <Moon className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;