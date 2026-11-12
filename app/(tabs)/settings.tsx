import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <Text className="px-4 pb-4 pt-6 text-4xl font-bold text-slate-900 dark:text-slate-100">
        Ajustes
      </Text>
      <Text className="px-4 text-base text-slate-600 dark:text-slate-400">Próximamente.</Text>
    </View>
  );
}
