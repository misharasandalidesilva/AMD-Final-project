# AMD-Final-project
To-Do List App with Notifications (React Native)
=======

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
=======
>>>>>>> c70e40b (First commit)
>>>>>>> 67ba11e (ui done)

# Todo Dashboard App 📝

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-v18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.1.0-blue)

A modern, responsive **Todo Dashboard Web App** built with **React** and **TypeScript**, featuring **task management**, **calendar view**, **notifications**, and **dark/light themes**.

# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** |  React Native, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | firebase |
| **Image Handling** | Expo ImagePicker |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration
# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Your Name]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Your Name]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Your Name]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Your Name]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Your Name]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!# ✅ TaskMaster - Smart Todo & Task Management App

TaskMaster is a modern, intuitive task management application built with React Native and Expo. Organize your daily tasks, set priorities, track progress, and boost your productivity with beautiful visualizations and smart calendar integration.

![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

## 📊 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](#)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview

TaskMaster helps you:

✅ **Organize tasks** with priorities, categories, and due dates  
🗓️ **Visual calendar** for better task planning  
📊 **Track progress** with beautiful charts and statistics  
🎨 **Beautiful UI** with smooth animations and modern design  
📱 **Cross-platform** - Works on both iOS and Android  

## 🚀 Key Features

### 📝 Task Management
- ✅ **CRUD Operations**: Create, read, update, delete tasks
- 🏷️ **Categories**: Work, Personal, Health with custom icons
- ⭐ **Priority Levels**: High, Medium, Low with visual indicators
- 📅 **Due Dates**: Calendar integration with date selection
- ✔️ **Task Completion**: Mark tasks as done with progress tracking

### 🗓️ Smart Calendar
- 📆 **Interactive Calendar**: Beautiful month view with task indicators
- 🎯 **Date Selection**: Tap any date to create tasks instantly
- 🌟 **Visual Feedback**: Today highlighting, selected dates, past date handling
- 📱 **Modal Integration**: Seamless task creation from calendar

### 👤 Profile & Gallery
- 🖼️ **Photo Gallery**: Personal photo collection with grid/list views
- 📸 **Image Management**: Add, view, delete photos with full-screen viewer
- 👥 **Profile Customization**: Edit bio, location, and personal info
- 📊 **Statistics**: Track your productivity stats and achievements

### 🎨 Modern UI/UX
- 🌈 **Gradient Designs**: Beautiful color schemes throughout the app
- ✨ **Smooth Animations**: Micro-interactions for better user experience
- 📱 **Responsive Layout**: Works perfectly on all screen sizes
- 🌙 **Clean Design**: Modern, minimalist interface with Tailwind CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Expo 54, React Native 0.81, TypeScript |
| **Navigation** | Expo Router, React Navigation |
| **UI/Styling** | NativeWind (Tailwind), Expo Components, LinearGradient |
| **Database** | AsyncStorage / SQLite (local storage) |
| **Image Handling** | Expo ImagePicker, Expo MediaLibrary |
| **Icons** | Expo Vector Icons (@expo/vector-icons) |
| **Build** | Expo Application Services (EAS) |

## 📂 Project Structure

```
app/                # Screens & navigation (Expo Router)
├── (auth)/        # Authentication screens
├── (tabs)/        # Main app tabs
├── view/          # Task viewing screens
└── create/        # Task creation screens

components/        # Reusable UI components
├── Calendar.tsx   # Calendar component
├── TaskForm.tsx   # Task creation form
├── ProfileGallery.tsx # Gallery component
└── ...

services/          # Business logic services
├── TaskService.ts # Task CRUD operations
├── StorageService.ts # Data persistence
└── ...

types/            # TypeScript interfaces
├── Task.ts       # Task type definitions
└── ...

utils/            # Helper functions
├── dateUtils.ts  # Date formatting utilities
├── validators.ts # Form validation
└── ...

assets/           # Images, fonts, etc.
```

## 🎯 Core Services

### TaskService
```typescript
// Clean service API for task management
- addTask(task: Task): Promise<void>
- getTasks(): Promise<Task[]>
- updateTask(id: string, task: Partial<Task>): Promise<void>
- deleteTask(id: string): Promise<void>
- getTasksByDate(date: string): Promise<Task[]>
```

### StorageService
```typescript
// Local data persistence
- saveData(key: string, data: any): Promise<void>
- getData(key: string): Promise<any>
- removeData(key: string): Promise<void>
```

## 📲 Running Locally

### Prerequisites
- **Node.js** LTS (v18+)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - Mac only)

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/taskmaster-app.git
cd taskmaster-app

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator (Mac only)
npm run web        # Web browser (limited support)
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

- **development** → Dev client + APK for testing
- **preview** → Internal distribution + APK
- **production** → Production build with auto-increment

### Build Commands
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure project (first time)
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx            # Welcome/Home screen
├── (tabs)/              # Tab navigation
│   ├── dashboard.tsx    # Dashboard with stats
│   ├── tasks.tsx        # Task list view
│   ├── calendar.tsx     # Calendar view
│   └── profile.tsx      # User profile
├── create/
│   └── task.tsx         # Create new task
└── view/
    ├── task/[id].tsx    # Task detail view
    └── gallery.tsx      # Photo gallery
```

## 🎨 Key Components

### Creative Calendar
- 🗓️ **Interactive month view** with smooth navigation
- 🎯 **Date selection** with visual feedback
- ✨ **Gradient styling** and modern design
- 📱 **Task creation integration**

### Task Form
- 📝 **Rich form inputs** with validation
- 🏷️ **Category selection** with icons and colors
- ⭐ **Priority picker** with visual indicators
- 📅 **Date picker** with calendar integration

### Profile Gallery
- 📸 **Photo management** with camera/gallery access
- 🖼️ **Grid/List view modes** for different preferences
- 🔍 **Full-screen viewer** with gesture support
- ✏️ **Profile editing** with real-time updates

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Mishara Sandali]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by [Mishara Sandali]**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!

## 📊 Features in Detail

### Task Categories
| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| **Work** | 💼 | Blue | Professional tasks and projects |
| **Personal** | 🏠 | Purple | Personal life and hobbies |
| **Health** | ❤️ | Pink | Health, fitness, and wellness |

### Priority Levels
| Priority | Icon | Color | Usage |
|----------|------|-------|-------|
| **High** | 🔥 | Red | Urgent, important tasks |
| **Medium** | ⚡ | Orange | Normal priority tasks |
| **Low** | 🌱 | Green | Nice-to-have tasks |

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "TaskMaster",
    "slug": "taskmaster-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL",
      "MEDIA_LIBRARY"
    ]
  }
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      }
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**Metro bundler cache issues**
```bash
npx expo start --clear
```

**Android build failures**
```bash
cd android && ./gradlew clean && cd ..
npx expo run:android
```

**iOS simulator not launching**
```bash
npx expo run:ios --simulator="iPhone 15"
```

**Image picker permissions**
- Check `app.json` for correct permissions
- Test on physical device for camera access

## 🔒 Security & Best Practices

✅ **Input Validation**: All form inputs are validated  
✅ **Data Sanitization**: User inputs are cleaned before storage  
✅ **Secure Storage**: Sensitive data uses encrypted storage  
✅ **Permission Handling**: Proper camera/gallery permissions  
✅ **Error Handling**: Graceful error handling throughout  

## 🎯 Upcoming Features

- [ ] **Cloud Sync** - Sync tasks across devices
- [ ] **Team Collaboration** - Share tasks with others
- [ ] **Recurring Tasks** - Set up repeating tasks
- [ ] **Task Templates** - Quick task creation templates
- [ ] **Dark Mode** - System-wide dark theme
- [ ] **Notifications** - Push notifications for due tasks
- [ ] **Analytics** - Detailed productivity analytics
- [ ] **Export/Import** - Backup and restore functionality

## 📜 License

MIT License © 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

## 🙌 Acknowledgements

Built with ❤️ using:

- [**Expo**](https://expo.dev/) - The fastest way to build React Native apps
- [**React Native**](https://reactnative.dev/) - Learn once, write anywhere
- [**NativeWind**](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [**Expo Router**](https://docs.expo.dev/router/introduction/) - File-based routing
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript that scales

## ⚡ TaskMaster – Organize smarter, achieve more, live better.

## 📞 Support

Having trouble with TaskMaster?

- 🐛 [**Open an issue**](https://github.com/yourusername/taskmaster-app/issues) on GitHub
- 📧 **Email us** at your.email@example.com
- 💬 **Join our Discord** community for help and tips

---

**Made with ❤️ by Mishara sandali**

⭐ **Don't forget to star this repository if you find it useful!**

---

### 🚀 Ready to boost your productivity? Download TaskMaster today!

## 🚀 Live Demo

[Click here to see the demo]()  

---
