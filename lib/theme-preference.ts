import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'light' | 'dark';

const KEY = 'theme-preference';

export async function getThemePreference(): Promise<ThemePreference | null> {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export async function saveThemePreference(theme: ThemePreference): Promise<void> {
  await AsyncStorage.setItem(KEY, theme);
}
