import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';

export default function ProductsScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Producten</Text>
      <Text style={styles.intro}>Een tijdelijke productweergave. Straks laden we hier jouw Webflow-producten in.</Text>
      {products.map((product) => <ProductCard key={product.id} product={product} onPress={() => router.push(`/product/${product.id}`)} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flexGrow: 1, padding: 20 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 10 }, intro: { color: '#596568', fontSize: 15, lineHeight: 22, marginVertical: 12 } });
