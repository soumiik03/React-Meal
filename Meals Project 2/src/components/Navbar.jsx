export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <span className="logo-emoji" role="img" aria-label="plate with fork and knife">🍽️</span>
          <span className="logo-text">RecipeRealm</span>
        </a>
        <ul className="navbar-menu">
          <li>
            <a href="#home" className="navbar-link active">Home</a>
          </li>
          <li>
            <a href="#explore" className="navbar-link">Explore</a>
          </li>
          <li>
            <a href="#favorites" className="navbar-link">Favorites</a>
          </li>
          <li>
            <a href="#about" className="navbar-link">About</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
