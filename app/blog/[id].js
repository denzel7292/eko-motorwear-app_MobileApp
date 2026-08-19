import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { blogs } from '../../data/blogs';

export default function BlogDetailsScreen() {
  const { id } = useLocalSearchParams();
  const blog = blogs.find((item) => item.id === id);
  return <View style={styles.screen}><Text style={styles.label}>{blog?.category || 'BLOGDETAIL'}</Text><Text style={styles.title}>{blog?.title || String(id).replaceAll('-', ' ')}</Text><Text style={styles.text}>{blog?.intro || 'Dit artikel bestaat niet.'}</Text><Text style={styles.date}>{blog?.date || ''}</Text></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flex: 1, padding: 24 }, label: { color: '#607377', fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginTop: 10 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 14, textTransform: 'capitalize' }, text: { color: '#596568', fontSize: 16, lineHeight: 24, marginTop: 16 }, date: { color: '#607377', fontSize: 14, fontWeight: '700', marginTop: 22 } });
