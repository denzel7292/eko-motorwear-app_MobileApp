import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
        placeholderTextColor="#718084"
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
  wrapper: { marginBottom: 18 },
  searchInput: { backgroundColor: '#ffffff', borderColor: '#c7d0d2', borderRadius: 9, borderWidth: 1, color: '#1c2528', fontSize: 15, paddingHorizontal: 14, paddingVertical: 13 },
  label: { color: '#465458', fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 16 },
  choiceRow: { gap: 8, paddingRight: 20 },
  choice: { backgroundColor: '#e0e5e6', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 9 },
  choiceSelected: { backgroundColor: '#415e66' },
  choiceText: { color: '#465458', fontSize: 13, fontWeight: '700' },
  choiceTextSelected: { color: '#ffffff' },
  sortRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sortButton: { backgroundColor: '#ffffff', borderColor: '#c7d0d2', borderRadius: 8, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9 },
  sortButtonSelected: { backgroundColor: '#d7ddde', borderColor: '#415e66' },
  sortText: { color: '#465458', fontSize: 12, fontWeight: '700' },
  sortTextSelected: { color: '#1c2528' },
  resetButton: { alignSelf: 'flex-start', marginTop: 14 },
  resetText: { color: '#415e66', fontSize: 13, fontWeight: '800', textDecorationLine: 'underline' },
});
