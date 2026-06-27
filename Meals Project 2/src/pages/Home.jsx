import { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import MealCard from '../components/MealCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import SearchInput from '../components/SearchInput'
import { filterMeals } from '../utils/search'
import '../styles/meals.css'

export default function Home() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/meals')
        const json = await response.json()
        const mealsData = json.data.data || []

        // Extract ingredients for each meal
        const processedMeals = mealsData.map((meal) => {
          const ingredients = []
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            if (ingredient && ingredient.trim()) {
              ingredients.push(ingredient)
            }
          }
          return {
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb,
            description: meal.strInstructions,
            category: meal.strCategory,
            area: meal.strArea,
            ingredients: ingredients
          }
        })

        setMeals(processedMeals)
        setLoading(false)
      } catch {
        setError('Failed to load meals')
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  const filteredMeals = useMemo(() => {
    return filterMeals(meals, searchQuery)
  }, [meals, searchQuery])

  return (
    <div className="container">
      <Header />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          {meals.length === 0 ? (
            <div className="no-meals-state" id="empty-meals-state">
              <span className="empty-icon" role="img" aria-label="plate and utensils">🍽️</span>
              <h3>No meals available</h3>
              <p>Please check back later.</p>
            </div>
          ) : filteredMeals.length === 0 ? (
            <div className="no-meals-state" id="empty-search-state">
              <span className="empty-icon" role="img" aria-label="magnifying glass">🔍</span>
              <h3>No matches found</h3>
              <p>We couldn't find any meals matching "{searchQuery}".</p>
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="meals-grid">
              {filteredMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}


