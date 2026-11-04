import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Leer',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color as string} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
