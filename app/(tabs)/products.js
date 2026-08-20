import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FilterControls from '../../components/FilterControls';
import ProductCard from '../../components/ProductCard';
import { productCategories, products } from '../../data/products';
import { filterByNameAndCategory, sortProducts } from '../../utils/catalog';

const sortOptions = [
  { label: 'Prijs laag-hoog', value: 'price-asc' },
  { label: 'Prijs hoog-laag', value: 'price-desc' },
  { label: 'Naam A-Z', value: 'name-asc' },
  { label: 'Naam Z-A', value: 'name-desc' },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedSort, setSelectedSort] = useState('price-asc');

  const visibleProducts = useMemo(() => {
    const filteredProducts = filterByNameAndCategory(products, searchTerm, selectedCategory, 'name');
    return sortProducts(filteredProducts, selectedSort);
  }, [searchTerm, selectedCategory, selectedSort]);

  function resetFilters() {
    setSearchTerm('');
    setSelectedCategory('Alle');
    setSelectedSort('price-asc');
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Producten</Text>
      <Text style={styles.intro}>Een tijdelijke productweergave. Hier laad ik de Webflow-producten in.</Text>
      <FilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={productCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onReset={resetFilters}
        placeholder="Zoek een product..."
      />
      <Text style={styles.resultCount}>{visibleProducts.length} producten gevonden</Text>
      {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onPress={() => router.push(`/product/${product.id}`)} />)}
      {visibleProducts.length === 0 && <Text style={styles.emptyState}>Geen producten gevonden. Pas je zoekterm of filters aan.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flexGrow: 1, padding: 20 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 10 }, intro: { color: '#596568', fontSize: 15, lineHeight: 22, marginVertical: 12 }, resultCount: { color: '#607377', fontSize: 13, fontWeight: '700', marginBottom: 12 }, emptyState: { color: '#596568', fontSize: 15, lineHeight: 22, marginTop: 20, textAlign: 'center' } });
