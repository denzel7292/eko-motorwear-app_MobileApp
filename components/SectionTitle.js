import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export default function SectionTitle({ title }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
});
