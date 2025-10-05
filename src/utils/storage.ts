// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'lastSelectedDate';

export async function saveDate(date: Date) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, date.toISOString());
  } catch (e) {
    console.warn('Failed to save date:', e);
  }
}

export async function loadDate(): Promise<Date | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? new Date(stored) : null;
  } catch (e) {
    console.warn('Failed to load date:', e);
    return null;
  }
}
