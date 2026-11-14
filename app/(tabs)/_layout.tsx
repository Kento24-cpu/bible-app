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
        animation: 'fade',
        tabBarActiveTintColor: dark ? '#60a5fa' : '#2563eb',
        tabBarInactiveTintColor: dark ? '#94a3b8' : '#64748b',
        tabBarStyle: {
          backgroundColor: dark ? '#000000' : '#ffffff',
          borderTopColor: dark ? '#1e293b' : '#e2e8f0',
        },
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Libros',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
