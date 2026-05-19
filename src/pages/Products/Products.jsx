import useTitle from '@hooks/useTitle'
import useProducts from '@hooks/useProducts'
import useFavorites from '@hooks/useFavorites'
import useSearchFilter from '@hooks/useSearchFilter'
import { useBasket } from '@store/BasketContext'
import ProductGrid from './ProductGrid'
import './Products.css'

function Products() {
  useTitle('Products')

  const { products, loading, error } = useProducts()
  const { favorites, toggle: toggleFavorite } = useFavorites()
  const { basket, toggle: toggleBasket } = useBasket()
  const displayed = useSearchFilter(products)

  function handleAddToCart(product) {
    toggleBasket(product)
  }

  if (loading) return <div className="products-page"><p className="products-page__msg">Loading...</p></div>
  if (error)   return <div className="products-page"><p className="products-page__msg products-page__msg--error">{error}</p></div>

  return (
    <div className="products-page">
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
