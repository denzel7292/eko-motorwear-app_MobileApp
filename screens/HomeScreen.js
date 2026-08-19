import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import SectionTitle from '../components/SectionTitle';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>EKO MOTORWEAR</Text>
        <Text style={styles.title}>Ride protected.{"\n"}Ride your way.</Text>
        <Text style={styles.intro}>
          Premium motorkleding voor elke rit, elk seizoen en elk avontuur.
        </Text>
        <Pressable style={styles.button} onPress={() => router.push('/products')}>
          <Text style={styles.buttonText}>Ontdek de collectie</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <SectionTitle title="Welkom bij EKO" />
        <Text style={styles.description}>
          Binnenkort vind je hier producten, motorinspiratie en de EKO Rider Challenge.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#101416',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: '#1c2528',
  },
  eyebrow: {
    color: '#d4ff3f',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 48,
  },
  intro: {
    color: '#d7dcdc',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#d4ff3f',
    borderRadius: 8,
    marginTop: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#101416',
    fontSize: 14,
    fontWeight: '800',
  },
  content: {
    padding: 28,
  },
  description: {
    color: '#b7c0c2',
    fontSize: 15,
    lineHeight: 22,
  },
});
