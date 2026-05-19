import { useState } from 'react'

function useFavorites() {
  const [favorites, setFavorites] = useState([])

  function toggle(product) {
    setFavorites(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
  }

  function isFavorite(productId) {
    return favorites.includes(productId)
  }

  return { favorites, toggle, isFavorite }
}

export default useFavorites
