import { useState, useCallback, useMemo } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import useTitle from '@hooks/useTitle'
import { useBasket } from '@store/basketStore'
import { useFavorites } from '@store/favoritesStore'
import useSearchFilter from '@hooks/useSearchFilter'
import Button from '@shared/components/Button/Button'
import ProductGrid from '../Products/ProductGrid'
import ConfirmModal from '@shared/components/ConfirmModal/ConfirmModal'
import './Basket.css'

function Basket() {
  useTitle('Basket')
  const { basket, toggle: toggleBasket, increment, decrement, clearBasket } = useBasket()
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const displayed = useSearchFilter(basket)

  const [removeTarget, setRemoveTarget] = useState(null)
  const [removeAllOpen, setRemoveAllOpen] = useState(false)

  const total = useMemo(
    () => basket.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0),
    [basket]
  )

  const handleRemove = useCallback((product) => {
    setRemoveTarget(product)
  }, [])

  const confirmRemove = useCallback(() => {
    if (removeTarget) toggleBasket(removeTarget)
    setRemoveTarget(null)
  }, [removeTarget, toggleBasket])

  const getQuantity = useCallback(
    (id) => basket.find(b => b.id === id)?.quantity ?? 1,
    [basket]
  )

  return (
    <div className="basket-page">
      {basket.length === 0 ? (
        <div className="basket-page__empty">
          <FiShoppingCart className="basket-page__empty-icon" />
          <p className="basket-page__empty-text">Your basket is empty</p>
        </div>
      ) : (
        <>
          <div className="basket-page__summary">
            <span className="basket-page__total">Total: <strong>$ {total.toFixed(2)}</strong></span>
            <Button variant="danger" className="basket-page__remove-all" onClick={() => setRemoveAllOpen(true)}>Remove All</Button>
          </div>

          <ProductGrid
            products={displayed}
            favorites={favorites}
            basket={basket}
            onToggleFavorite={toggleFavorite}
            onRemove={handleRemove}
            getQuantity={getQuantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
        </>
      )}

      <ConfirmModal
        isOpen={!!removeTarget}
        message={`"${removeTarget?.title}" basketdən silinsin?`}
        confirmText="Sil"
        cancelText="Ləğv et"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveTarget(null)}
      />

      <ConfirmModal
        isOpen={removeAllOpen}
        message="Bütün məhsullar basketdən silinsin?"
        confirmText="Hamısını sil"
        cancelText="Ləğv et"
        onConfirm={() => { clearBasket(); setRemoveAllOpen(false) }}
        onCancel={() => setRemoveAllOpen(false)}
      />
    </div>
  )
}

export default Basket
