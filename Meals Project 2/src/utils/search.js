/**
 * Safely filters a list of meals based on a search query.
 * Normalizes both search query and meal title by collapsing multiple whitespace characters
 * to ensure robust matches even with extra spaces, and performs a case-insensitive match.
 *
 * @param {Array} meals - List of meal objects to filter
 * @param {string} query - The search query
 * @returns {Array} - The filtered list of meals
 */
export function filterMeals(meals, query) {
  if (!Array.isArray(meals)) {
    return [];
  }

  // Trim leading/trailing whitespace and convert to lowercase
  const trimmed = (query || '').trim().toLowerCase();

  // If query is empty, return the original list
  if (!trimmed) {
    return meals;
  }

  // Normalize consecutive spaces in query to a single space
  const normalizedQuery = trimmed.replace(/\s+/g, ' ');

  return meals.filter((meal) => {
    if (!meal || !meal.title) {
      return false;
    }
    // Normalize consecutive spaces in meal title to a single space, and lowercase it
    const normalizedTitle = meal.title.toLowerCase().replace(/\s+/g, ' ');
    return normalizedTitle.includes(normalizedQuery);
  });
}
