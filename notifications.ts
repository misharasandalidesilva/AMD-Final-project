// app/notifications.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const settings = await Notifications.requestPermissionsAsync();
    return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
  } else {
    // Android: permissions usually granted at install
    return true;
  }
}

export async function scheduleNotification(title: string, body: string, date: Date) {
  // Accepts Date object
  const trigger = date;
  const id = await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: true },
    trigger,
  });
  return id;
}

export async function cancelNotification(id: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (e) {
    // ignore
  }
}
