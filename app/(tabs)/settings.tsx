import { Alert, Pressable, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Download, Info, Monitor, Moon, Sun } from 'lucide-react-native';
import { Uniwind, useUniwind } from 'uniwind';

import { saveThemePreference, type ThemePreference } from '@/lib/theme-preference';

const ICON_COLOR = '#64748b';
const ICON_ACTIVE_COLOR = '#1d4ed8';

const THEME_OPTIONS = [
  { value: 'system', label: 'Sistema', Icon: Monitor },
  { value: 'light', label: 'Claro', Icon: Sun },
  { value: 'dark', label: 'Oscuro', Icon: Moon },
] as const;

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme, hasAdaptiveThemes } = useUniwind();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  const setTheme = (next: ThemePreference) => {
    Uniwind.setTheme(next);
    void saveThemePreference(next).catch(() => {});
  };

  const selected: ThemePreference = hasAdaptiveThemes ? 'system' : theme === 'dark' ? 'dark' : 'light';

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-4 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Ajustes
      </Text>
      <View className="gap-2 px-4">
        <View className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <Text className="text-base text-slate-900 dark:text-slate-100">Tema</Text>
          <View className="mt-3 flex-row gap-2">
            {THEME_OPTIONS.map(({ value, label, Icon }) => {
              const active = value === selected;
              const color = active ? ICON_ACTIVE_COLOR : ICON_COLOR;

              return (
                <Pressable
                  key={value}
                  onPress={() => setTheme(value)}
                  className={`flex-1 items-center gap-1.5 rounded-xl px-2 py-3 ${
                    active ? 'bg-blue-100 dark:bg-blue-950' : 'bg-white dark:bg-slate-900'
                  }`}>
                  <Icon size={20} color={color} />
                  <Text
                    className={`text-sm font-semibold ${
                      active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Pressable
          className="flex-row items-center gap-4 rounded-2xl bg-blue-100 px-4 py-3 dark:bg-blue-950"
          onPress={() => Alert.alert('Actualizaciones', 'Próximamente.')}>
          <Download size={20} color={ICON_ACTIVE_COLOR} />
          <Text className="text-base font-semibold text-blue-700 dark:text-blue-300">
            Buscar actualizaciones
          </Text>
        </Pressable>
        <View className="flex-row items-center gap-4 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <Info size={20} color={ICON_COLOR} />
          <Text className="flex-1 text-base text-slate-900 dark:text-slate-100">
            Versión de la app
          </Text>
          <Text className="text-base text-slate-600 dark:text-slate-400">{version}</Text>
        </View>
      </View>
    </View>
  );
}
