import { useSearchParams } from 'react-router-dom'
import useTitle from '@hooks/useTitle'
import useProducts from '@hooks/useProducts'
import useFavorites from '@hooks/useFavorites'
import ProductGrid from './ProductGrid'
import './Products.css'

function applyFilter(products, q) {
  if (!q) return products
  const lower = q.toLowerCase()
  return products.filter(p =>
    p.title.toLowerCase().includes(lower) ||
    p.category.toLowerCase().includes(lower)
  )
}

function applySort(products, sort) {
  if (!sort) return products
  return [...products].sort((a, b) => {
    if (sort === 'name-asc')   return a.title.localeCompare(b.title)
    if (sort === 'name-desc')  return b.title.localeCompare(a.title)
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })
}

function Products() {
  useTitle('Products')

  const { products, loading, error } = useProducts()
  const { favorites, toggle } = useFavorites()
  const [searchParams] = useSearchParams()

  const q    = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || ''

  const displayed = applySort(applyFilter(products, q), sort)

  function handleAddToCart(product) {
    console.log('Added to cart:', product.title)
  }

  if (loading) return <div className="products-page"><p className="products-page__msg">Loading...</p></div>
  if (error)   return <div className="products-page"><p className="products-page__msg products-page__msg--error">{error}</p></div>

  return (
    <div className="products-page">
      <ProductGrid
        products={displayed}
        favorites={favorites}
        onAddToCart={handleAddToCart}
        onToggleFavorite={toggle}
      />
    </div>
  )
}

export default Products
