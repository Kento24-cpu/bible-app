import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Download, Info } from 'lucide-react-native';

const ICON_COLOR = '#64748b';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const version = Constants.expoConfig?.version ?? '1.0.0';
  const [checking, setChecking] = useState(false);

  const checkForUpdates = async () => {
    if (!Updates.isEnabled) {
      Alert.alert('Actualizaciones', 'No disponible en este entorno.');
      return;
    }

    setChecking(true);

    try {
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) {
        Alert.alert('Actualizaciones', 'Ya tienes la última versión.');
        return;
      }

      await Updates.fetchUpdateAsync();
      Alert.alert('Actualización lista', 'Cierra y vuelve a abrir la app para aplicarla.');
    } catch {
      Alert.alert('Actualizaciones', 'No se pudo buscar la actualización. Inténtalo de nuevo.');
    } finally {
      setChecking(false);
    }
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
          disabled={checking}
          className={`flex-row items-center justify-center rounded-2xl bg-blue-100 px-4 py-3 dark:bg-blue-950 ${
            checking ? 'opacity-60' : ''
          }`}
          onPress={checkForUpdates}>
          <Download size={20} color="#1d4ed8" />
          <Text className="ml-2 text-base font-semibold text-blue-700 dark:text-blue-300">
            {checking ? 'Buscando...' : 'Buscar actualizaciones'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
