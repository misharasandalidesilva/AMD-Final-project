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

# TaskMaster - Modern Todo Dashboard

TaskFlow is a comprehensive, intuitive task management application built with React Native and Expo. Organize your tasks, track progress, and boost productivity with beautiful visualizations and seamless user experience.

**React Native | Expo | Firebase | TypeScript**  
**License: MIT**

## 📱 Live Demo
🎬 **Now Available** – Full walkthrough of features

[🎥 Watch Demo](https://youtu.be/3hFx5V0nepE)

## 📲 Download APK
[📱 Download APK](#)

## ✨ Overview
TaskFlow helps you:
- ✅ Create, edit, and manage tasks efficiently
- 📊 Visualize productivity with interactive charts
- 🏷️ Organize with categories and priority levels
- 📅 Schedule tasks with calendar integration
- 🔐 Secure authentication with Firebase
- 🌙 Switch between light and dark themes

## 🚀 Key Features

### 🔐 **Authentication**
- Email + Password login/signup
- Google Sign-In (Android)
- Session persistence
- Password reset functionality

### ✅ **Task Management**
- Create, edit, delete tasks with real-time sync
- Priority levels (High, Medium, Low)
- Category organization (Work, Personal, Health)
- Due date scheduling
- Task completion tracking

### 📊 **Dashboard & Analytics**
- Beautiful progress visualization
- Task completion statistics
- Priority-based filtering
- Recent tasks overview
- Progress charts and insights

### 📅 **Calendar Integration**
- Monthly calendar view
- Task scheduling by date
- Due date reminders
- Today's task highlights

## 🛠️ Tech Stack
- **Framework:** Expo 51, React Native 0.74, TypeScript
- **Navigation:** Expo Router, React Navigation
- **UI:** NativeWind (Tailwind), Lucide React Native Icons, LinearGradient
- **Backend:** Firebase Auth, Firestore
- **State:** React Hooks, Context API
- **Build:** Expo Application Services (EAS)

## 📂 Project Structure
```
app/            # Screens & navigation (Expo Router)
components/     # Reusable UI components
  ├── Dashboard.tsx
  ├── Tasks.tsx
  ├── Calendar.tsx
  ├── Profile.tsx
  └── homepage.tsx
context/        # Auth & global contexts
services/       # Firebase services
types/          # TypeScript interfaces
firebase.ts     # Firebase configuration
eas.json        # Build profiles
```

## 🔑 Firebase Setup
The app integrates with Firebase for backend services:

### **Authentication**
- Email/Password authentication
- Google OAuth (client ID + SHA-1 for Android)

### **Firestore Database**
- Real-time task synchronization
- User-scoped data security
- Optimized queries for performance

### **Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧩 Services Architecture
Clean service layer abstracts Firebase operations:

- **TaskService** → CRUD operations, real-time listeners
- **AuthService** → Authentication, user management
- **NotificationService** → Push notifications, reminders
- **ThemeService** → Dark/light mode persistence

## 📲 Running Locally

### Prerequisites
- Node.js 18+ LTS
- Expo CLI
- Android Studio (for emulator)

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/taskflow.git
cd taskflow

# Install dependencies
npm install

# Start development server
npm run start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web browser (limited support)
```

### Environment Configuration
Create `firebase.ts` with your Firebase config:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 📦 Building with EAS

Pre-configured build profiles in `eas.json`:

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Configure project
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

## 🖥️ Screens & Navigation

Organized with Expo Router file-based routing:

- **(auth)** → Login, Signup, Password Reset
- **(dashboard)** → Main dashboard, statistics
- **(tasks)** → Task list, search, filters
- **(calendar)** → Monthly view, task scheduling

## 🎨 Design System

### **Color Palette**
- Primary: `#4F46E5` (Indigo)
- Secondary: `#7C3AED` (Purple)
- Accent: `#3B82F6` (Blue)
- Success: `#10B981` (Emerald)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)

### **Typography**
- Headers: Bold, 24-32px
- Body: Medium, 14-16px
- Captions: Regular, 12-14px

## 🔒 Security Best Practices
- Firebase Security Rules enforcement
- Environment variables for sensitive data
- User authentication validation
- Data sanitization and validation

## 🛠️ Troubleshooting

### Common Issues:
- **Build errors:** Clear Metro cache with `npx expo start --clear`
- **Firebase connection:** Verify configuration in `firebase.ts`
- **Android signing:** Check SHA-1 fingerprint for Google Auth
- **iOS builds:** Ensure proper provisioning profiles

## 📈 Performance Optimizations
- React.memo for expensive components
- useMemo and useCallback for heavy computations
- FlatList for large task lists
- Image optimization and caching
- Bundle size optimization

## 🧪 Testing
```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E testing
npm run test:e2e
```

## 📜 License
MIT License © 2024 [Your Name]

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🙌 Acknowledgements
Built with modern tools and libraries:
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [React Native](https://reactnative.dev/)
- [Lucide Icons](https://lucide.dev/)
- [NativeWind](https://nativewind.dev/)

## ⚡ TaskFlow – Organize better, achieve more.

## 📞 Support
Having trouble with TaskFlow?
- 🐛 [Open an issue](https://github.com/yourusername/taskflow/issues)
- 📧 Email: your.email@example.com
- 💬 [Join our Discord](#)

---
**Made with ❤️ by Mishara Sandali**  
⭐ Star this repository if you find it helpful!
