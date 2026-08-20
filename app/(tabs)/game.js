import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GameScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.label}>COMING SOON</Text>
      <Text style={styles.title}>EKO Rider{`\n`}Challenge</Text>
      <Text style={styles.intro}>Hier bouwen ik later een reactiegames met score, timer en herstartknop.</Text>
      <Pressable style={styles.button} onPress={() => {}}><Text style={styles.buttonText}>Start game</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { alignItems: 'flex-start', backgroundColor: '#1c2528', flex: 1, justifyContent: 'center', padding: 28 }, label: { color: '#c7d0d2', fontSize: 12, fontWeight: '700', letterSpacing: 2 }, title: { color: '#ffffff', fontSize: 38, fontWeight: '800', lineHeight: 44, marginTop: 14 }, intro: { color: '#d7dcdc', fontSize: 16, lineHeight: 24, marginTop: 18 }, button: { backgroundColor: '#d8e1e3', borderRadius: 8, marginTop: 28, paddingHorizontal: 18, paddingVertical: 14 }, buttonText: { color: '#1c2528', fontSize: 14, fontWeight: '800' } });
