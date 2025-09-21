import React from 'react';
import { 
  Bell, 
  Search, 
  Check, 
  Calendar, 
  Edit3, 
  Trash2, 
  Clock, 
  Plus 
} from 'lucide-react';
import { Task, Theme, Stats } from './types';

interface TasksProps {
  tasks: Task[];
  filteredTasks: Task[];
  stats: Stats;
  darkMode: boolean;
  theme: Theme;
  unreadNotifications: number;
  activeTab: 'all' | 'active' | 'completed';
  searchQuery: string;
  setActiveTab: (tab: 'all' | 'active' | 'completed') => void;
  setSearchQuery: (query: string) => void;
  setShowAddModal: (show: boolean) => void;
  setShowNotificationModal: (show: boolean) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEditTask: (task: Task) => void;
  getPriorityColor: (priority: string) => string;
  getCategoryColor: (category: string) => string;
}

const Tasks: React.FC<TasksProps> = ({
  filteredTasks,
  stats,
  darkMode,
  theme,
  unreadNotifications,
  activeTab,
  searchQuery,
  setActiveTab,
  setSearchQuery,
  setShowAddModal,
  setShowNotificationModal,
  toggleTask,
  deleteTask,
  startEditTask,
  getPriorityColor,
  getCategoryColor
}) => {
  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">My Tasks</h1>
              <p className="text-white text-opacity-90 text-base sm:text-lg">
                {stats.active} tasks remaining
              </p>
            </div>
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative p-2 sm:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
            >
              <Bell className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-white text-opacity-70" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl sm:rounded-2xl placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex space-x-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl sm:rounded-2xl p-1 max-w-6xl mx-auto`}>
          {(['all', 'active', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg'
                  : (darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-blue-500')
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-1 sm:ml-2 text-xs">
                ({tab === 'all' ? stats.total : tab === 'active' ? stats.active : stats.completed})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 space-y-3 sm:space-y-4 overflow-y-auto pb-24">
        <div className="max-w-6xl mx-auto">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`${theme.card} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 transition-all duration-300 transform hover:scale-[1.01] ${
                task.completed 
                  ? (darkMode ? 'border-green-600 bg-green-900 bg-opacity-30' : 'border-green-200 bg-green-50') 
                  : 'hover:shadow-2xl'
              }`}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 sm:w-7 h-6 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    task.completed
                      ? 'bg-gradient-to-r from-green-300 to-emerald-300 border-green-400 shadow-lg'
                      : (darkMode ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-400')
                  }`}
                >
                  {task.completed && <Check className="w-4 sm:w-5 h-4 sm:h-5 text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-base sm:text-lg ${
                        task.completed 
                          ? 'line-through text-gray-500'
                          : (darkMode ? 'text-white' : 'text-gray-900')
                      } truncate`}>
                        {task.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        task.completed 
                          ? 'line-through text-gray-400'
                          : (darkMode ? 'text-gray-300' : 'text-gray-600')
                      } break-words`}>
                        {task.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <div className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${getPriorityColor(task.priority)} shadow-md`}></div>
                          <span className={`text-xs font-medium capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.priority}</span>
                        </div>
                        
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)} shadow-sm`}>
                          {task.category}
                        </span>
                        
                        {task.dueDate && (
                          <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">{task.dueDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-3">
                      <button
                        onClick={() => startEditTask(task)}
                        className={`p-1 sm:p-2 rounded-lg transition-colors ${
                          darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className={`p-1 sm:p-2 rounded-lg transition-colors ${
                          darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Clock className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600">No tasks found</h3>
            <p className="text-gray-500">Add a new task to get started!</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-blue-500 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center z-50"
      >
        <Plus className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
      </button>
    </div>
  );
};

export default Tasks;