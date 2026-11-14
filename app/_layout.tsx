import '../global.css';

import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { Uniwind, useUniwind } from 'uniwind';

import { getThemePreference } from '@/lib/theme-preference';

export { ErrorBoundary } from 'expo-router';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useUniwind();
  const dark = theme === 'dark';

  useEffect(() => {
    getThemePreference().then((saved) => {
      Uniwind.setTheme(saved);
      void SplashScreen.hideAsync();
    });
  }, []);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(dark ? '#000000' : '#ffffff');
  }, [dark]);

  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: dark ? '#000000' : '#ffffff' },
        }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
