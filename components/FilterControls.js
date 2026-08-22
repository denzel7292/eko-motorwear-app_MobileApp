import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '../constants/theme';

export default function FilterControls({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOptions,
  selectedSort,
  onSortChange,
  onReset,
  placeholder,
}) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={searchTerm}
        onChangeText={onSearchChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        style={styles.searchInput}
      />

      <Text style={styles.label}>Categorie</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.choiceRow}>
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => onCategoryChange(category)}
            style={[styles.choice, selectedCategory === category && styles.choiceSelected]}
          >
            <Text style={[styles.choiceText, selectedCategory === category && styles.choiceTextSelected]}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.label}>Sorteren</Text>
      <View style={styles.sortRow}>
        {sortOptions.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onSortChange(option.value)}
            style={[styles.sortButton, selectedSort === option.value && styles.sortButtonSelected]}
          >
            <Text style={[styles.sortText, selectedSort === option.value && styles.sortTextSelected]}>{option.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={onReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset filters</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  searchInput: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.small, borderWidth: 1, color: colors.text, fontSize: 15, paddingHorizontal: 14, paddingVertical: 13 },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, marginTop: 18, textTransform: 'uppercase' },
  choiceRow: { gap: 8, paddingRight: 20 },
  choice: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.pill, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 9 },
  choiceSelected: { backgroundColor: colors.text, borderColor: colors.text },
  choiceText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  choiceTextSelected: { color: colors.accentText },
  sortRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sortButton: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.small, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9 },
  sortButtonSelected: { backgroundColor: colors.surfaceSoft, borderColor: colors.textMuted },
  sortText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  sortTextSelected: { color: colors.text },
  resetButton: { alignSelf: 'flex-start', marginTop: 14 },
  resetText: { color: colors.text, fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
});
