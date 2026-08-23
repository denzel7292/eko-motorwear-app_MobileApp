import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCatalog } from '../../context/CatalogContext';
import { colors, radius } from '../../constants/theme';

export default function BlogDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { blogs } = useCatalog();
  const blog = blogs.find((item) => item.id === id);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => { Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }).start(); }, [fade]);

  return <ScrollView contentContainerStyle={styles.screen}>
    <Animated.View style={[styles.image, { opacity: fade }]}>{blog?.image ? <Image source={blog.image} style={styles.blogImage} resizeMode="cover" /> : <Text style={styles.imageText}>EKO / JOURNAL</Text>}</Animated.View>
    <Text style={styles.label}>{blog?.category || 'BLOGDETAIL'} · {blog?.date || ''}</Text>
    <Text style={styles.title}>{blog?.title || String(id).replaceAll('-', ' ')}</Text>
    <Text style={styles.text}>{blog?.intro || 'Dit artikel bestaat niet.'}</Text>
    <View style={styles.rule} />
    <Text style={styles.body}>{blog?.body || 'Praktische informatie voor motorrijders.'}</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: colors.background, flexGrow: 1, padding: 20 }, image: { alignItems: 'center', backgroundColor: colors.surfaceRaised, borderRadius: radius.large, height: 235, justifyContent: 'center', overflow: 'hidden' }, blogImage: { height: '100%', width: '100%' }, imageText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 2 }, label: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.3, marginTop: 24, textTransform: 'uppercase' }, title: { color: colors.text, fontSize: 34, fontWeight: '900', letterSpacing: -1.4, lineHeight: 38, marginTop: 10 }, text: { color: colors.textMuted, fontSize: 17, lineHeight: 25, marginTop: 16 }, rule: { backgroundColor: colors.line, height: 1, marginVertical: 26 }, body: { color: colors.textMuted, fontSize: 16, lineHeight: 26, paddingBottom: 30 } });
