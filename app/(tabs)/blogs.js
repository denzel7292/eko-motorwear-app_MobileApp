import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FilterControls from '../../components/FilterControls';
import BlogCard from '../../components/BlogCard';
import { blogCategories, blogs } from '../../data/blogs';
import { filterByNameAndCategory, sortBlogs } from '../../utils/catalog';

const sortOptions = [
  { label: 'Nieuwste eerst', value: 'newest' },
  { label: 'Oudste eerst', value: 'oldest' },
  { label: 'Titel A-Z', value: 'name-asc' },
  { label: 'Titel Z-A', value: 'name-desc' },
];

export default function BlogsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedSort, setSelectedSort] = useState('newest');

  const visibleBlogs = useMemo(() => {
    const filteredBlogs = filterByNameAndCategory(blogs, searchTerm, selectedCategory, 'title');
    return sortBlogs(filteredBlogs, selectedSort);
  }, [searchTerm, selectedCategory, selectedSort]);

  function resetFilters() {
    setSearchTerm('');
    setSelectedCategory('Alle');
    setSelectedSort('newest');
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Blogs</Text>
      <Text style={styles.intro}>Een tijdelijke blogweergave. Later koppel ik hier de Webflow CMS-data.</Text>
      <FilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={blogCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onReset={resetFilters}
        placeholder="Zoek een blog..."
      />
      <Text style={styles.resultCount}>{visibleBlogs.length} blogs gevonden</Text>
      {visibleBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} onPress={() => router.push(`/blog/${blog.id}`)} />)}
      {visibleBlogs.length === 0 && <Text style={styles.emptyState}>Geen blogs gevonden. Pas je zoekterm of filters aan.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flexGrow: 1, padding: 20 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 10 }, intro: { color: '#596568', fontSize: 15, lineHeight: 22, marginVertical: 12 }, resultCount: { color: '#607377', fontSize: 13, fontWeight: '700', marginBottom: 12 }, emptyState: { color: '#596568', fontSize: 15, lineHeight: 22, marginTop: 20, textAlign: 'center' } });
