import { Tabs } from 'expo-router';
import { BookOpen, Settings } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

export default function TabLayout() {
  const { theme } = useUniwind();
  const dark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: dark ? '#60a5fa' : '#2563eb',
        tabBarInactiveTintColor: dark ? '#94a3b8' : '#64748b',
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Libros',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
