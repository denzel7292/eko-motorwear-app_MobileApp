import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

function TabIcon({ symbol, color, count }) {
  return <View><Text style={{ color, fontSize: 16 }}>{symbol}</Text>{count > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>}</View>;
}

export default function TabLayout() {
  const { itemCount } = useCart();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: { backgroundColor: colors.overlay, borderTopColor: colors.line, height: 92, paddingBottom: 22, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon symbol="⌂" color={color} /> }} />
      <Tabs.Screen name="products" options={{ title: 'Producten', tabBarIcon: ({ color }) => <TabIcon symbol="□" color={color} /> }} />
      <Tabs.Screen name="blogs" options={{ title: 'Blogs', tabBarIcon: ({ color }) => <TabIcon symbol="○" color={color} /> }} />
      <Tabs.Screen name="game" options={{ title: 'Game', tabBarIcon: ({ color }) => <TabIcon symbol="★" color={color} /> }} />
      <Tabs.Screen name="cart" options={{ title: 'Mandje', tabBarIcon: ({ color }) => <TabIcon symbol="▣" color={color} count={itemCount} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({ badge: { alignItems: 'center', backgroundColor: colors.text, borderRadius: 8, height: 15, justifyContent: 'center', minWidth: 15, position: 'absolute', right: -10, top: -6 }, badgeText: { color: colors.accentText, fontSize: 9, fontWeight: '900' } });
