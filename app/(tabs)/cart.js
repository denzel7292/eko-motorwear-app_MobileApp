import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../../context/CartContext';
import { colors, radius } from '../../constants/theme';

const money = (value) => `€ ${value.toFixed(2).replace('.', ',')}`;

export default function CartScreen() {
  const { items, itemCount, total, updateQuantity } = useCart();

  if (items.length === 0) {
    return <View style={styles.empty}><Text style={styles.kicker}>JOUW SELECTIE</Text><Text style={styles.title}>Je mandje is leeg.</Text><Text style={styles.emptyText}>Voeg een product toe vanuit de collectie om hier je aantallen en totaalprijs te bekijken.</Text></View>;
  }

  return <ScrollView contentContainerStyle={styles.screen}>
    <Text style={styles.kicker}>JOUW SELECTIE / {itemCount} ITEMS</Text>
    <Text style={styles.title}>Winkelmandje</Text>
    {items.map((item) => <View key={item.id} style={styles.item}>
      <View style={styles.imageWrap}><Image source={item.image} style={styles.image} resizeMode="contain" /></View>
      <View style={styles.itemContent}><Text style={styles.itemName}>{item.name}</Text><Text style={styles.itemPrice}>{money(item.price)}</Text><View style={styles.quantityRow}><Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}><Text style={styles.quantityText}>−</Text></Pressable><Text style={styles.quantity}>{item.quantity}</Text><Pressable style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}><Text style={styles.quantityText}>+</Text></Pressable></View></View>
    </View>)}
    <View style={styles.total}><Text style={styles.totalLabel}>Totaal</Text><Text style={styles.totalPrice}>{money(total)}</Text></View>
    <Pressable style={styles.checkout}><Text style={styles.checkoutText}>Verder naar afrekenen</Text></Pressable>
    <Text style={styles.note}>Demo-winkelmandje: afrekenen wordt later via Webflow E-commerce gekoppeld.</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: colors.background, flexGrow: 1, padding: 20 }, empty: { backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: 26 }, kicker: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginTop: 12 }, title: { color: colors.text, fontSize: 36, fontWeight: '900', letterSpacing: -1.4, marginTop: 8 }, emptyText: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: 14 }, item: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.medium, borderWidth: 1, flexDirection: 'row', marginTop: 18, overflow: 'hidden', padding: 10 }, imageWrap: { alignItems: 'center', backgroundColor: '#F4F4F1', borderRadius: radius.small, height: 106, justifyContent: 'center', width: 96 }, image: { height: '94%', width: '94%' }, itemContent: { flex: 1, justifyContent: 'space-between', paddingLeft: 13, paddingVertical: 3 }, itemName: { color: colors.text, fontSize: 16, fontWeight: '800' }, itemPrice: { color: colors.textMuted, fontSize: 14, marginTop: 4 }, quantityRow: { alignItems: 'center', flexDirection: 'row', gap: 12 }, quantityButton: { alignItems: 'center', borderColor: colors.line, borderRadius: 9, borderWidth: 1, height: 30, justifyContent: 'center', width: 30 }, quantityText: { color: colors.text, fontSize: 18, lineHeight: 19 }, quantity: { color: colors.text, fontSize: 14, fontWeight: '800', minWidth: 12, textAlign: 'center' }, total: { alignItems: 'center', borderTopColor: colors.line, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 26, paddingTop: 18 }, totalLabel: { color: colors.textMuted, fontSize: 15, fontWeight: '700' }, totalPrice: { color: colors.text, fontSize: 24, fontWeight: '900' }, checkout: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: radius.small, marginTop: 18, padding: 16 }, checkoutText: { color: colors.accentText, fontSize: 14, fontWeight: '900' }, note: { color: colors.textFaint, fontSize: 12, lineHeight: 18, marginTop: 16, textAlign: 'center' } });
