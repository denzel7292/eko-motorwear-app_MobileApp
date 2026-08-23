import { Stack } from 'expo-router';
import { colors } from '../constants/theme';
import { CartProvider } from '../context/CartContext';
import { CatalogProvider } from '../context/CatalogContext';

export default function RootLayout() {
  return (
    <CatalogProvider>
      <CartProvider>
        <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, headerShadowVisible: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          <Stack.Screen name="blog/[id]" options={{ title: 'Blog' }} />
        </Stack>
      </CartProvider>
    </CatalogProvider>
  );
}
