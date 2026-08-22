import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../constants/theme';

export default function BlogCard({ blog, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imagePlaceholder}><Image source={blog.image} style={styles.image} resizeMode="cover" /></View>
      <View style={styles.content}>
        <Text style={styles.category}>{blog.category} · {blog.date}</Text>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.intro}>{blog.intro}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.medium, borderWidth: 1, marginBottom: 14, overflow: 'hidden' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  imagePlaceholder: { backgroundColor: colors.surfaceRaised, height: 152, overflow: 'hidden' },
  image: { height: '100%', width: '100%' },
  content: { padding: 16 },
  category: { color: colors.textFaint, fontSize: 10, fontWeight: '800', letterSpacing: 1.1, marginBottom: 8, textTransform: 'uppercase' },
  title: { color: colors.text, fontSize: 20, fontWeight: '800', letterSpacing: -0.4, lineHeight: 25 },
  intro: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 9 },
});
