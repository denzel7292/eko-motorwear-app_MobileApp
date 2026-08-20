export function filterByNameAndCategory(items, searchTerm, selectedCategory, nameKey) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = item[nameKey].toLowerCase().includes(normalizedSearch);
    const matchesCategory = selectedCategory === 'Alle' || item.category === selectedCategory;
    return matchesName && matchesCategory;
  });
}

export function sortProducts(items, sortValue) {
  const sortedItems = [...items];

  if (sortValue === 'price-asc') return sortedItems.sort((a, b) => a.price - b.price);
  if (sortValue === 'price-desc') return sortedItems.sort((a, b) => b.price - a.price);
  if (sortValue === 'name-asc') return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  if (sortValue === 'name-desc') return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
  return sortedItems;
}

export function sortBlogs(items, sortValue) {
  const sortedItems = [...items];

  if (sortValue === 'newest') return sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortValue === 'oldest') return sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortValue === 'name-asc') return sortedItems.sort((a, b) => a.title.localeCompare(b.title));
  if (sortValue === 'name-desc') return sortedItems.sort((a, b) => b.title.localeCompare(a.title));
  return sortedItems;
}
