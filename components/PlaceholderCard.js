import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PlaceholderCard({ eyebrow, title, description, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  pressed: { opacity: 0.75 },
  imagePlaceholder: { backgroundColor: '#c7d0d2', height: 128 },
  content: { padding: 16 },
  eyebrow: { color: '#607377', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  title: { color: '#1c2528', fontSize: 19, fontWeight: '700', marginBottom: 7 },
  description: { color: '#596568', fontSize: 14, lineHeight: 20 },
});
