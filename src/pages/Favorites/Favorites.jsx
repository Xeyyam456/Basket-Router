import { useState, useCallback } from 'react'
import { FiHeart } from 'react-icons/fi'
import useTitle from '@hooks/useTitle'
import useFavorites from '@hooks/useFavorites'
import { useBasket } from '@store/basketStore'
import useSearchFilter from '@hooks/useSearchFilter'
import Button from '@shared/components/Button/Button'
import ProductGrid from '../Products/ProductGrid'
import ConfirmModal from '@shared/components/ConfirmModal/ConfirmModal'
import styles from './Favorites.module.css'

function Favorites() {
  useTitle('Favorites')
  const { favorites, toggle: toggleFavorite, clearFavorites } = useFavorites()
  const { basket, toggle: toggleBasket } = useBasket()
  const displayed = useSearchFilter(favorites)

  const [removeTarget, setRemoveTarget] = useState(null)
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  const handleRemove = useCallback((product) => {
    setRemoveTarget(product)
  }, [])

  const confirmRemove = useCallback(() => {
    if (removeTarget) toggleFavorite(removeTarget)
    setRemoveTarget(null)
  }, [removeTarget, toggleFavorite])

  return (
    <div className={styles['favorites-page']}>
      {favorites.length === 0 ? (
        <div className={styles['favorites-page__empty']}>
          <FiHeart className={styles['favorites-page__empty-icon']} />
          <p className={styles['favorites-page__empty-text']}>No favorites yet</p>
        </div>
      ) : (
        <>
          <div className={styles['favorites-page__summary']}>
            <Button variant="danger" className={styles['favorites-page__remove-all']} onClick={() => setRemoveAllOpen(true)}>Remove All</Button>
          </div>

          <ProductGrid
            products={displayed}
            favorites={favorites}
            basket={basket}
            onToggleFavorite={toggleFavorite}
            onAddToCart={toggleBasket}
            onRemove={handleRemove}
          />
        </>
      )}

      <ConfirmModal
        isOpen={!!removeTarget}
        message={`"${removeTarget?.title}" favoritesdən silinsin?`}
        confirmText="Sil"
        cancelText="Ləğv et"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveTarget(null)}
      />

      <ConfirmModal
        isOpen={removeAllOpen}
        message="Bütün məhsullar favoritesdən silinsin?"
        confirmText="Hamısını sil"
        cancelText="Ləğv et"
        onConfirm={() => { clearFavorites(); setRemoveAllOpen(false) }}
        onCancel={() => setRemoveAllOpen(false)}
      />
    </div>
  )
}

export default Favorites
