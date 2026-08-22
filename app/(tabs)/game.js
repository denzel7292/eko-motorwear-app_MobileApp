import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export default function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.label}>RIDER CHALLENGE / 01</Text>
      <Text style={styles.title}>EKO Rider{`\n`}Challenge</Text>
      <View style={styles.visual}><View style={styles.track} /><Text style={styles.visualText}>READY?</Text></View>
      <Text style={styles.intro}>Een snelle reactiegames met score, timer en herstartknop. Binnenkort klaar voor je eerste ronde.</Text>
      <Pressable style={styles.button} onPress={() => {}}><Text style={styles.buttonText}>Start challenge</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { alignItems: 'flex-start', backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: 28 }, label: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.7 }, title: { color: colors.text, fontSize: 42, fontWeight: '900', letterSpacing: -1.8, lineHeight: 43, marginTop: 14 }, visual: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.large, borderWidth: 1, height: 130, justifyContent: 'center', marginTop: 26, overflow: 'hidden', width: '100%' }, track: { backgroundColor: colors.surfaceSoft, borderRadius: radius.pill, height: 58, transform: [{ rotate: '-10deg' }], width: '125%' }, visualText: { color: colors.text, fontSize: 13, fontWeight: '900', letterSpacing: 2, position: 'absolute' }, intro: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: 20 }, button: { backgroundColor: colors.accent, borderRadius: radius.small, marginTop: 28, paddingHorizontal: 18, paddingVertical: 14 }, buttonText: { color: colors.accentText, fontSize: 13, fontWeight: '800' } });
