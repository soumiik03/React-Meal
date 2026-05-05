import { useState, useEffect } from 'react'
import Header from '../components/Header'
import MealCard from '../components/MealCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import '../styles/meals.css'

export default function Home() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      } catch (err) {
        setError('Failed to load meals')
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  return (
    <div className="container">
      <Header />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      <div className="meals-grid">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}
