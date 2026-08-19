import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imagePlaceholder}><Text style={styles.imageText}>PRODUCTFOTO</Text></View>
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>€ {product.price.toFixed(2).replace('.', ',')}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  pressed: { opacity: 0.7 },
  imagePlaceholder: { alignItems: 'center', backgroundColor: '#c7d0d2', height: 144, justifyContent: 'center' },
  imageText: { color: '#607377', fontSize: 11, fontWeight: '700', letterSpacing: 1.4 },
  content: { padding: 16 },
  category: { color: '#607377', fontSize: 11, fontWeight: '700', letterSpacing: 1.1, marginBottom: 5 },
  name: { color: '#1c2528', fontSize: 20, fontWeight: '700' },
  description: { color: '#596568', fontSize: 14, lineHeight: 20, marginTop: 7 },
  price: { color: '#1c2528', fontSize: 16, fontWeight: '800', marginTop: 13 },
});
