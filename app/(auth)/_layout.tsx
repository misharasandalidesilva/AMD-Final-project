// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
















// // app/(auth)/_layout.tsx
// import React from 'react';
// import { Stack } from 'expo-router';
// import { View, StyleSheet } from 'react-native';

// export default function AuthLayout() {
//   return (
//     <View style={styles.container}>
//       <Stack screenOptions={{ headerShown: false }} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({ container: { flex: 1 } });
