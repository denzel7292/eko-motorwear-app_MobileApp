import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../data/products';
import { colors, radius } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const imageScale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.spring(imageScale, { toValue: 1, useNativeDriver: true, friction: 7 }).start();
  }, [imageScale]);

  function handleAdd() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    Animated.sequence([
      Animated.timing(imageScale, { toValue: 1.03, duration: 120, useNativeDriver: true }),
      Animated.spring(imageScale, { toValue: 1, useNativeDriver: true, friction: 6 }),
    ]).start();
    setTimeout(() => setAdded(false), 1500);
  }

  return <ScrollView contentContainerStyle={styles.screen}>
    <Animated.View style={[styles.image, { transform: [{ scale: imageScale }] }]}>{product?.image ? <Image source={product.image} style={styles.productImage} resizeMode="contain" /> : <Text style={styles.imageText}>EKO / PRODUCT</Text>}</Animated.View>
    <Text style={styles.label}>{product?.category || 'PRODUCTDETAIL'}</Text>
    <Text style={styles.title}>{product?.name || String(id).replaceAll('-', ' ')}</Text>
    <Text style={styles.text}>{product?.description || 'Dit product bestaat niet.'}</Text>
    <View style={styles.specs}><View style={styles.spec}><Text style={styles.specLabel}>MATERIAAL</Text><Text style={styles.specValue}>{product?.material}</Text></View><View style={styles.spec}><Text style={styles.specLabel}>MATEN</Text><Text style={styles.specValue}>{product?.sizes}</Text></View><View style={styles.spec}><Text style={styles.specLabel}>BESCHERMING</Text><Text style={styles.specValue}>{product?.protection}</Text></View></View>
    <View style={styles.buyRow}><Text style={styles.price}>{product ? `€ ${product.price.toFixed(2).replace('.', ',')}` : ''}</Text><Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleAdd}><Text style={styles.buttonText}>{added ? 'Toegevoegd ✓' : 'In mandje'}</Text></Pressable></View>
    <Text style={styles.note}>Lokale demo-data · later gekoppeld aan Webflow E-commerce.</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: colors.background, flexGrow: 1, padding: 20 }, image: { alignItems: 'center', backgroundColor: '#F4F4F1', borderRadius: radius.large, height: 270, justifyContent: 'center', overflow: 'hidden' }, productImage: { height: '94%', width: '94%' }, imageText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 2 }, label: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginTop: 24, textTransform: 'uppercase' }, title: { color: colors.text, fontSize: 34, fontWeight: '900', letterSpacing: -1.4, marginTop: 10 }, text: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: 14 }, specs: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.medium, borderWidth: 1, marginTop: 22, paddingHorizontal: 16 }, spec: { borderBottomColor: colors.line, borderBottomWidth: 1, paddingVertical: 13 }, specLabel: { color: colors.textFaint, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, specValue: { color: colors.text, fontSize: 14, lineHeight: 20, marginTop: 4 }, buyRow: { alignItems: 'center', flexDirection: 'row', gap: 16, justifyContent: 'space-between', marginTop: 24 }, price: { color: colors.text, flex: 1, fontSize: 22, fontWeight: '900' }, button: { backgroundColor: colors.accent, borderRadius: radius.small, paddingHorizontal: 16, paddingVertical: 14 }, buttonPressed: { opacity: 0.78, transform: [{ scale: 0.97 }] }, buttonText: { color: colors.accentText, fontSize: 13, fontWeight: '800' }, note: { color: colors.textFaint, fontSize: 12, lineHeight: 18, marginTop: 24 } });
