import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BlogCard from '../../components/BlogCard';
import { blogs } from '../../data/blogs';

export default function BlogsScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Blogs</Text>
      <Text style={styles.intro}>Een tijdelijke blogweergave. Later koppel je hier de Webflow CMS-data.</Text>
      {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} onPress={() => router.push(`/blog/${blog.id}`)} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flexGrow: 1, padding: 20 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 10 }, intro: { color: '#596568', fontSize: 15, lineHeight: 22, marginVertical: 12 } });
