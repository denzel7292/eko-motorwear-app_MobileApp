import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../constants/theme';

export default function ProductCard({ product, onPress }) {
  const price = Number(product.price || 0);

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        {product.image ? (
          <Image source={product.image} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={styles.imageFallback}>EKO</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>€ {price.toFixed(2).replace('.', ',')}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.medium, borderWidth: 1, marginBottom: 14, overflow: 'hidden' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  imagePlaceholder: { alignItems: 'center', backgroundColor: '#F4F4F1', height: 152, justifyContent: 'center', overflow: 'hidden' },
  image: { height: '94%', width: '94%' },
  imageFallback: { color: colors.textFaint, fontSize: 14, fontWeight: '800', letterSpacing: 2 },
  content: { padding: 16 },
  category: { color: colors.textFaint, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 7, textTransform: 'uppercase' },
  name: { color: colors.text, fontSize: 20, fontWeight: '800', letterSpacing: -0.4 },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 8 },
  price: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 14 },
});
