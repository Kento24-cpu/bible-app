import { Alert, Pressable, Switch, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Download, Info, Moon } from 'lucide-react-native';
import { Uniwind, useUniwind } from 'uniwind';

import { saveThemePreference } from '@/lib/theme-preference';

const ICON_COLOR = '#64748b';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useUniwind();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const setDarkMode = (enabled: boolean) => {
    const next = enabled ? 'dark' : 'light';
    Uniwind.setTheme(next);
    void saveThemePreference(next).catch(() => {});
  };

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-4 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Ajustes
      </Text>
      <View className="gap-2 px-4">
        <View className="flex-row items-center rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <Info size={20} color={ICON_COLOR} />
          <Text className="ml-3 flex-1 text-base text-slate-900 dark:text-slate-100">
            Versión de la app
          </Text>
          <Text className="text-base text-slate-600 dark:text-slate-400">{version}</Text>
        </View>
        <Pressable
          className="flex-row items-center justify-center rounded-2xl bg-blue-100 px-4 py-3 dark:bg-blue-950"
          onPress={() => Alert.alert('Actualizaciones', 'Próximamente.')}>
          <Download size={20} color="#1d4ed8" />
          <Text className="ml-2 text-base font-semibold text-blue-700 dark:text-blue-300">
            Buscar actualizaciones
          </Text>
        </Pressable>
        <View className="flex-row items-center rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <Moon size={20} color={ICON_COLOR} />
          <Text className="ml-3 flex-1 text-base text-slate-900 dark:text-slate-100">
            Modo oscuro
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={setDarkMode}
            trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
          />
        </View>
      </View>
    </View>
  );
}
