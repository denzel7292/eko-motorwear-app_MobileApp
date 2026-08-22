import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FilterControls from '../../components/FilterControls';
import ProductCard from '../../components/ProductCard';
import { productCategories, products } from '../../data/products';
import { filterByNameAndCategory, sortProducts } from '../../utils/catalog';
import { colors } from '../../constants/theme';

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
      <Text style={styles.kicker}>SHOP / EKO</Text>
      <Text style={styles.title}>De collectie</Text>
      <Text style={styles.intro}>Geselecteerde motorkleding voor elke rit, elk seizoen en elk niveau.</Text>
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

const styles = StyleSheet.create({ screen: { backgroundColor: colors.background, flexGrow: 1, padding: 20 }, kicker: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginTop: 12 }, title: { color: colors.text, fontSize: 36, fontWeight: '900', letterSpacing: -1.4, marginTop: 8 }, intro: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginVertical: 12 }, resultCount: { color: colors.textFaint, fontSize: 12, fontWeight: '800', letterSpacing: 0.5, marginBottom: 12, textTransform: 'uppercase' }, emptyState: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 20, textAlign: 'center' } });
