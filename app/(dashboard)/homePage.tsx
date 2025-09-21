import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Bell, Check, X, Calendar, Clock, Search, ChevronLeft, ChevronRight, User, Home, CalendarDays, Edit3, Trash2, Sun, Moon } from 'lucide-react';

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  category: 'Work' | 'Personal' | 'Health';
  notifications: boolean;
};

type Notification = {
  id: number;
  message: string;
  time: string;
  type: 'urgent' | 'reminder' | 'info';
  taskId: number;
  read: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Finish the client presentation slides",
    completed: false,
    priority: "high",
    dueDate: "2024-12-20",
    category: "Work",
    notifications: true
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Milk, bread, eggs, vegetables",
    completed: true,
    priority: "medium",
    dueDate: "2024-12-18",
    category: "Personal",
    notifications: false
  },
  {
    id: 3,
    title: "Exercise workout",
    description: "30 minutes cardio + strength training",
    completed: false,
    priority: "low",
    dueDate: "2024-12-19",
    category: "Health",
    notifications: true
  }
];

const TodoMobileApp = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentPage, setCurrentPage] = useState<'home' | 'calendar' | 'profile'>('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Complete project proposal is due today!", time: "2 min ago", type: "urgent", taskId: 1, read: false },
    { id: 2, message: "Exercise workout scheduled for today", time: "3 hours ago", type: "info", taskId: 3, read: true }
  ]);

  const [newTaskDetails, setNewTaskDetails] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
    category: 'Personal' as const,
    notifications: true
  });

  // Memoized computed values
  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  }), [tasks]);

  const unreadNotifications = useMemo(() => 
    notifications.filter(n => !n.read).length
  , [notifications]);

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

  // Optimized callbacks
  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setNotifications(prev => prev.filter(notif => notif.taskId !== id));
  }, []);

  const addTask = useCallback(() => {
    if (newTaskDetails.title.trim()) {
      const task: Task = {
        id: Date.now(),
        ...newTaskDetails,
        completed: false
      };
      setTasks(prev => [...prev, task]);
      setNewTaskDetails({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'Personal',
        notifications: true
      });
      setShowAddModal(false);
    }
  }, [newTaskDetails]);

  const startEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setNewTaskDetails({ 
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
      notifications: task.notifications
    });
    setShowEditModal(true);
  }, []);

  const updateTask = useCallback(() => {
    if (newTaskDetails.title.trim() && editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id
          ? { ...newTaskDetails, id: editingTask.id, completed: task.completed }
          : task
      ));
      setShowEditModal(false);
      setEditingTask(null);
      setNewTaskDetails({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'Personal',
        notifications: true
      });
    }
  }, [newTaskDetails, editingTask]);

  // Simplified style functions
  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-gradient-to-r from-orange-300 to-red-300',
      medium: 'bg-gradient-to-r from-yellow-300 to-amber-300',
      low: 'bg-gradient-to-r from-green-300 to-emerald-300'
    };
    return colors[priority as keyof typeof colors] || 'bg-gradient-to-r from-gray-300 to-slate-300';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Work: darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-200 text-blue-700',
      Personal: darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-700',
      Health: darkMode ? 'bg-green-800 text-green-200' : 'bg-green-200 text-green-700'
    };
    return colors[category as keyof typeof colors] || (darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700');
  };

  // Calendar functions
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

  // Optimized theme classes
  const theme = {
    bg: darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900',
    card: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    input: darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
  };

  const renderHome = () => (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 px-6 pt-12 pb-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-15 -left-5 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-lg"></div>
          <div className="absolute bottom-0 right-1/2 w-40 h-40 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
              <p className="text-white text-opacity-90 text-lg">
                {stats.active} tasks remaining
              </p>
            </div>
            <button
              onClick={() => setShowNotificationModal(true)}
              className="relative p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
            >
              <Bell className="w-7 h-7 text-white" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white text-opacity-70" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex space-x-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-2xl p-1`}>
          {(['all', 'active', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg'
                  : (darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-blue-500')
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-xs">
                ({tab === 'all' ? stats.total : tab === 'active' ? stats.active : stats.completed})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto pb-20">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`${theme.card} rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
              task.completed 
                ? (darkMode ? 'border-green-600 bg-green-900 bg-opacity-30' : 'border-green-200 bg-green-50') 
                : 'hover:shadow-2xl'
            }`}
          >
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  task.completed
                    ? 'bg-gradient-to-r from-green-300 to-emerald-300 border-green-400 shadow-lg'
                    : (darkMode ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-400')
                }`}
              >
                {task.completed && <Check className="w-5 h-5 text-white" />}
              </button>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${
                      task.completed 
                        ? `line-through ${darkMode ? 'text-gray-500' : 'text-gray-500'}`
                        : (darkMode ? 'text-white' : 'text-gray-900')
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      task.completed 
                        ? `line-through ${darkMode ? 'text-gray-600' : 'text-gray-400'}`
                        : (darkMode ? 'text-gray-300' : 'text-gray-600')
                    }`}>
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-3 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)} shadow-md`}></div>
                        <span className={`text-xs font-medium capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{task.priority}</span>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)} shadow-sm`}>
                        {task.category}
                      </span>
                      
                      {/* Due Date */}
                      {task.dueDate && (
                        <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{task.dueDate}</span>
                        </div>
                      )}
                      
                      {/* Notifications */}
                      {task.notifications && (
                        <Bell className="w-4 h-4 text-indigo-500" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEditTask(task)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode 
                          ? 'text-purple-300 hover:text-purple-200 hover:bg-purple-900 hover:bg-opacity-30' 
                          : 'text-purple-400 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                      title="Edit task"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        darkMode 
                          ? 'text-red-300 hover:text-red-200 hover:bg-red-900 hover:bg-opacity-30' 
                          : 'text-red-400 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600">No tasks found</h3>
            <p className="text-gray-500">Add a new task to get started!</p>
          </div>
        )}
      </div>

      {/* Add Button */}
      {currentPage === 'home' && (
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-blue-500 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center z-50"
        >
          <Plus className="w-8 h-8 text-white" />
        </button>
      )}
    </>
  );

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => {
            setNewTaskDetails(prev => ({...prev, dueDate: formatDate(date)}));
            setShowAddModal(true);
          }}
          className={`h-12 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-200 ${
            isToday
              ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold shadow-lg'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="text-sm">{day}</span>
        </div>
      );
    }

    return (
      <div className={`${theme.card} rounded-2xl p-6 border-2`}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigateMonth(-1)} className="p-3 rounded-xl hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button onClick={() => navigateMonth(1)} className="p-3 rounded-xl hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">{days}</div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className={`${theme.card} rounded-2xl p-6 border-2`}>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${theme.card} rounded-2xl p-6 border-2 text-center`}>
          <h3 className="text-2xl font-bold text-blue-500">{stats.total}</h3>
          <p className="text-gray-600">Total Tasks</p>
        </div>
        <div className={`${theme.card} rounded-2xl p-6 border-2 text-center`}>
          <h3 className="text-2xl font-bold text-green-500">{stats.completed}</h3>
          <p className="text-gray-600">Completed</p>
        </div>
      </div>

      <div className={`${theme.card} rounded-2xl p-6 border-2`}>
        <h3 className="text-lg font-bold mb-4">Settings</h3>
        
        <div className="flex items-center justify-between">
          <span className="font-medium">Theme</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(false)}
              className={`p-3 rounded-xl ${!darkMode ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TaskModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
      <div className={`${theme.card} w-full rounded-t-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Task</h2>
          <button
            onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={newTaskDetails.title}
            onChange={(e) => setNewTaskDetails(prev => ({...prev, title: e.target.value}))}
            className={`w-full p-4 border-2 rounded-xl ${theme.input}`}
          />
          
          <textarea
            placeholder="Description"
            rows={3}
            value={newTaskDetails.description}
            onChange={(e) => setNewTaskDetails(prev => ({...prev, description: e.target.value}))}
            className={`w-full p-4 border-2 rounded-xl ${theme.input}`}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={newTaskDetails.priority}
              onChange={(e) => setNewTaskDetails(prev => ({...prev, priority: e.target.value as 'high' | 'medium' | 'low'}))}
              className={`p-4 border-2 rounded-xl ${theme.input}`}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <select
              value={newTaskDetails.category}
              onChange={(e) => setNewTaskDetails(prev => ({...prev, category: e.target.value as 'Work' | 'Personal' | 'Health'}))}
              className={`p-4 border-2 rounded-xl ${theme.input}`}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <input
            type="date"
            value={newTaskDetails.dueDate}
            onChange={(e) => setNewTaskDetails(prev => ({...prev, dueDate: e.target.value}))}
            className={`w-full p-4 border-2 rounded-xl ${theme.input}`}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}
            className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? updateTask : addTask}
            className="flex-1 py-4 px-6 bg-blue-500 text-white rounded-xl"
          >
            {isEdit ? 'Update' : 'Add'} Task
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <div className="w-full min-h-screen flex flex-col">
        
        <div className="flex-1 pb-20">
          {currentPage === 'home' && renderHome()}
          {currentPage === 'calendar' && (
            <div className="p-6 pb-24">
              <h1 className="text-2xl font-bold mb-6">Calendar</h1>
              {renderCalendar()}
            </div>
          )}
          {currentPage === 'profile' && (
            <div className="p-6 pb-24">
              <h1 className="text-2xl font-bold mb-6">Profile</h1>
              {renderProfile()}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className={`${theme.card} border-t px-6 py-4 fixed bottom-0 left-0 right-0`}>
          <div className="flex items-center justify-around max-w-md mx-auto">
            {([
              {page: 'home', icon: Home, label: 'Home'},
              {page: 'calendar', icon: CalendarDays, label: 'Calendar'},
              {page: 'profile', icon: User, label: 'Profile'}
            ] as const).map(({page, icon: Icon, label}) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-colors ${
                  currentPage === page ? 'text-white bg-blue-500' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modals */}
        {showNotificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
            <div className={`${theme.card} w-full rounded-t-3xl p-6 space-y-4`}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <button onClick={() => setShowNotificationModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border-2 ${
                        notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <p className="font-medium">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showAddModal && <TaskModal />}
        {showEditModal && <TaskModal isEdit />}
      </div>
    </div>
  );
};

export default TodoMobileApp;