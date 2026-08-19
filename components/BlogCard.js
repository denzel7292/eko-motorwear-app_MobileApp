import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function BlogCard({ blog, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imagePlaceholder}><Text style={styles.imageText}>BLOGAFBEELDING</Text></View>
      <View style={styles.content}>
        <Text style={styles.category}>{blog.category} · {blog.date}</Text>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.intro}>{blog.intro}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  pressed: { opacity: 0.7 },
  imagePlaceholder: { alignItems: 'center', backgroundColor: '#d7ddde', height: 144, justifyContent: 'center' },
  imageText: { color: '#607377', fontSize: 11, fontWeight: '700', letterSpacing: 1.4 },
  content: { padding: 16 },
  category: { color: '#607377', fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 7 },
  title: { color: '#1c2528', fontSize: 20, fontWeight: '700', lineHeight: 26 },
  intro: { color: '#596568', fontSize: 14, lineHeight: 20, marginTop: 8 },
});
