import AsyncStorage from '@react-native-async-storage/async-storage';

import { getThemePreference, saveThemePreference } from '../lib/theme-preference';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('theme preference', () => {
  test('saves and restores a theme', async () => {
    await saveThemePreference('dark');
    await expect(getThemePreference()).resolves.toBe('dark');
  });

  test('defaults to the system theme when nothing is stored', async () => {
    await expect(getThemePreference()).resolves.toBe('system');
  });

  test('restores the system theme', async () => {
    await saveThemePreference('system');
    await expect(getThemePreference()).resolves.toBe('system');
  });

  test('ignores unknown values', async () => {
    await AsyncStorage.setItem('theme-preference', 'purple');
    await expect(getThemePreference()).resolves.toBe('system');
  });
});
