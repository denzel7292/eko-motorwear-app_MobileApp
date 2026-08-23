import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FilterControls from '../../components/FilterControls';
import BlogCard from '../../components/BlogCard';
import { useCatalog } from '../../context/CatalogContext';
import { filterByNameAndCategory, sortBlogs } from '../../utils/catalog';
import { colors } from '../../constants/theme';

const sortOptions = [
  { label: 'Nieuwste eerst', value: 'newest' },
  { label: 'Oudste eerst', value: 'oldest' },
  { label: 'Titel A-Z', value: 'name-asc' },
  { label: 'Titel Z-A', value: 'name-desc' },
];

export default function BlogsScreen() {
  const { blogCategories, blogs } = useCatalog();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedSort, setSelectedSort] = useState('newest');

  const visibleBlogs = useMemo(() => {
    const filteredBlogs = filterByNameAndCategory(blogs, searchTerm, selectedCategory, 'title');
    return sortBlogs(filteredBlogs, selectedSort);
  }, [blogs, searchTerm, selectedCategory, selectedSort]);

  function resetFilters() {
    setSearchTerm('');
    setSelectedCategory('Alle');
    setSelectedSort('newest');
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.kicker}>JOURNAL / EKO</Text>
      <Text style={styles.title}>Rijdersverhalen</Text>
      <Text style={styles.intro}>Praktische inzichten, routes en uitrustingstips voor onderweg.</Text>
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
      {visibleBlogs.map((blog, index) => <BlogCard key={blog.id || `blog-${index}`} blog={blog} onPress={() => router.push(`/blog/${blog.id || index}`)} />)}
      {visibleBlogs.length === 0 && <Text style={styles.emptyState}>Geen blogs gevonden. Pas je zoekterm of filters aan.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { backgroundColor: colors.background, flexGrow: 1, padding: 20 }, kicker: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginTop: 12 }, title: { color: colors.text, fontSize: 36, fontWeight: '900', letterSpacing: -1.4, marginTop: 8 }, intro: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginVertical: 12 }, resultCount: { color: colors.textFaint, fontSize: 12, fontWeight: '800', letterSpacing: 0.5, marginBottom: 12, textTransform: 'uppercase' }, emptyState: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 20, textAlign: 'center' } });
