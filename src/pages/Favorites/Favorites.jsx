import useTitle from '@hooks/useTitle'
import './Favorites.css'

function Favorites() {
  useTitle('Favorites')
  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
    </div>
  )
}

export default Favorites
