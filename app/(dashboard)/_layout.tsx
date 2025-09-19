// app/(dashboard)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function DashboardLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
