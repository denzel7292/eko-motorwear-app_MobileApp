import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);
  return <View style={styles.screen}><Text style={styles.label}>{product?.category || 'PRODUCTDETAIL'}</Text><Text style={styles.title}>{product?.name || String(id).replaceAll('-', ' ')}</Text><Text style={styles.text}>{product?.description || 'Dit product bestaat niet.'}</Text><Text style={styles.price}>{product ? `€ ${product.price.toFixed(2).replace('.', ',')}` : ''}</Text></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: '#f1f3f3', flex: 1, padding: 24 }, label: { color: '#607377', fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginTop: 10 }, title: { color: '#1c2528', fontSize: 30, fontWeight: '800', marginTop: 14, textTransform: 'capitalize' }, text: { color: '#596568', fontSize: 16, lineHeight: 24, marginTop: 16 }, price: { color: '#1c2528', fontSize: 22, fontWeight: '800', marginTop: 22 } });
