import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import SectionTitle from '../components/SectionTitle';
import { colors, radius } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.brandRow}>
          <View style={styles.mark}><View style={styles.markDot} /></View>
          <Text style={styles.brand}>EKO MOTORWEAR</Text>
        </View>
        <Text style={styles.title}>Built for{`\n`}every ride.</Text>
        <View style={styles.visualStrip}><View style={styles.visualGlow} /></View>
        <Text style={styles.intro}>Premium motorkleding voor rijders die bescherming, comfort en stijl even belangrijk vinden.</Text>
        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/products')}><Text style={styles.primaryButtonText}>Shop de collectie</Text></Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => router.push('/blogs')}><Text style={styles.secondaryButtonText}>Lees inspiratie</Text></Pressable>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.kicker}>EKO / KONTICH</Text>
        <SectionTitle title="Kies bewust. Rij vrij." />
        <Text style={styles.description}>Ontdek producten, motortips en de EKO Rider Challenge in één rustige, snelle ervaring.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  hero: { backgroundColor: colors.surface, flex: 1, justifyContent: 'center', overflow: 'hidden', padding: 26 },
  brandRow: { alignItems: 'center', flexDirection: 'row', gap: 9, marginBottom: 34 },
  mark: { alignItems: 'center', backgroundColor: colors.text, borderRadius: 10, height: 30, justifyContent: 'center', width: 30 },
  markDot: { backgroundColor: colors.background, borderRadius: 5, height: 10, transform: [{ rotate: '45deg' }], width: 10 },
  brand: { color: colors.text, fontSize: 12, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: colors.text, fontSize: 48, fontWeight: '900', letterSpacing: -2.2, lineHeight: 48 },
  visualStrip: { backgroundColor: colors.overlay, borderColor: '#29333D', borderRadius: radius.pill, borderWidth: 1, height: 52, marginTop: 24, overflow: 'hidden' },
  visualGlow: { backgroundColor: colors.surfaceSoft, borderRadius: radius.pill, height: 90, left: '24%', position: 'absolute', top: -20, transform: [{ rotate: '-14deg' }], width: 210 },
  intro: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: 22, maxWidth: 360 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 26 },
  primaryButton: { backgroundColor: colors.accent, borderRadius: radius.small, paddingHorizontal: 17, paddingVertical: 14 },
  primaryButtonText: { color: colors.accentText, fontSize: 13, fontWeight: '800' },
  secondaryButton: { borderColor: colors.line, borderRadius: radius.small, borderWidth: 1, paddingHorizontal: 17, paddingVertical: 14 },
  secondaryButtonText: { color: colors.text, fontSize: 13, fontWeight: '800' },
  content: { backgroundColor: colors.background, padding: 26 },
  kicker: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.6, marginBottom: 10 },
  description: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
