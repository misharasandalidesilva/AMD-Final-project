// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { LoaderProvider } from '../context/LoaderContext';

export default function RootLayout() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
      </AuthProvider>
    </LoaderProvider>
  );
}















// // app/_layout.tsx
// import React from 'react';
// import { Slot } from 'expo-router';
// import { AuthProvider } from '../context/AuthContext';
// import { LoaderProvider } from '../context/LoaderContext';
// import Loader from '../components/Loader';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <LoaderProvider>
//         <Slot />
//         <Loader />
//       </LoaderProvider>
//     </AuthProvider>
//   );
// }
