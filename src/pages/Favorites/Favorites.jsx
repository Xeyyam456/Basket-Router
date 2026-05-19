import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import useTitle from '@hooks/useTitle'
import useFavorites from '@hooks/useFavorites'
import { useBasket } from '@store/BasketContext'
import useSearchFilter from '@hooks/useSearchFilter'
import ProductGrid from '../Products/ProductGrid'
import ConfirmModal from '@shared/components/ConfirmModal/ConfirmModal'
import './Favorites.css'

function Favorites() {
  useTitle('Favorites')
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const { basket, toggle: toggleBasket } = useBasket()
  const displayed = useSearchFilter(favorites)

  const [removeTarget, setRemoveTarget] = useState(null)

  function handleRemove(product) {
    setRemoveTarget(product)
  }

  function confirmRemove() {
    if (removeTarget) toggleFavorite(removeTarget)
    setRemoveTarget(null)
  }

  return (
    <div className="favorites-page">
      {/* <h1 className="favorites-page__heading">Favorites ({favorites.length})</h1> */}

      {favorites.length === 0 ? (
        <div className="favorites-page__empty">
          <FiHeart className="favorites-page__empty-icon" />
          <p className="favorites-page__empty-text">No favorites yet</p>
        </div>
      ) : (
        <ProductGrid
          products={displayed}
          favorites={favorites}
          basket={basket}
          onToggleFavorite={toggleFavorite}
          onAddToCart={toggleBasket}
          onRemove={handleRemove}
        />
      )}

      <ConfirmModal
        isOpen={!!removeTarget}
        message={`"${removeTarget?.title}" favoritesdən silinsin?`}
        confirmText="Sil"
        cancelText="Ləğv et"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveTarget(null)}
      />
    </div>
  )
}

export default Favorites
