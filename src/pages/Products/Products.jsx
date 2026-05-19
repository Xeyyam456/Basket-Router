import { useCallback } from 'react'
import useTitle from '@hooks/useTitle'
import useProducts from '@hooks/useProducts'
import useFavorites from '@hooks/useFavorites'
import useSearchFilter from '@hooks/useSearchFilter'
import { useBasket } from '@store/basketStore'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import ProductGrid from './ProductGrid'
import styles from './Products.module.css'

function Products() {
  useTitle('Products')

  const { products, loading, error } = useProducts()
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const { basket, toggle: toggleBasket } = useBasket()
  const displayed = useSearchFilter(products)

  const handleAddToCart = useCallback((product) => {
    toggleBasket(product)
  }, [toggleBasket])

  if (loading) return <LoadingBar />
  if (error)   return <div className={styles['products-page']}><p className={`${styles['products-page__msg']} ${styles['products-page__msg--error']}`}>{error}</p></div>

  return (
    <div className={styles['products-page']}>
      <ProductGrid
        products={displayed}
        favorites={favorites}
        basket={basket}
        onAddToCart={handleAddToCart}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}

export default Products
