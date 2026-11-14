import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark' | 'system';

const KEY = 'theme-preference';

export async function getThemePreference(): Promise<ThemePreference> {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  } catch {
    return 'system';
  }
}

export async function saveThemePreference(theme: ThemePreference): Promise<void> {
  await AsyncStorage.setItem(KEY, theme);
}
