export default function MealCard({ meal }) {
  return (
    <div className="meal-card">
      <div className="meal-image">
        <img src={meal.image} alt={meal.title} />
      </div>
      <div className="meal-content">
        <h2>{meal.title}</h2>
        <p className="meal-description">{meal.description}</p>
        {meal.ingredients && meal.ingredients.length > 0 && (
          <div className="ingredients">
            <strong>Ingredients:</strong>
            <p>{meal.ingredients.slice(0, 3).join(', ')}{meal.ingredients.length > 3 ? '...' : ''}</p>
          </div>
        )}
      </div>
    </div>
  )
}
