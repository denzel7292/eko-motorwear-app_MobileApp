import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function TabIcon({ symbol, color }) {
  return <Text style={{ color, fontSize: 16 }}>{symbol}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2528' },
        headerTintColor: '#ffffff',
        tabBarActiveTintColor: '#415e66',
        tabBarInactiveTintColor: '#8d989b',
        tabBarStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon symbol="⌂" color={color} /> }} />
      <Tabs.Screen name="products" options={{ title: 'Producten', tabBarIcon: ({ color }) => <TabIcon symbol="□" color={color} /> }} />
      <Tabs.Screen name="blogs" options={{ title: 'Blogs', tabBarIcon: ({ color }) => <TabIcon symbol="○" color={color} /> }} />
      <Tabs.Screen name="game" options={{ title: 'Game', tabBarIcon: ({ color }) => <TabIcon symbol="★" color={color} /> }} />
    </Tabs>
  );
}
