import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Uniwind } from 'uniwind';

import { getThemePreference } from '@/lib/theme-preference';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    getThemePreference().then((saved) => {
      if (saved) Uniwind.setTheme(saved);
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
