import { useState, useEffect } from 'react'
import useTitle from '@hooks/useTitle'
import { productService } from '@services/productService'
import ProductGrid from './ProductGrid'
import './Products.css'

function Products() {
  useTitle('Products')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    productService
      .getAll()
      .then(data => setProducts(data.products))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function handleAddToCart(product) {
    console.log('Added to cart:', product.title)
  }

  function handleToggleFavorite(product) {
    setFavorites(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    )
  }

  if (loading) return <div className="products-page"><p className="products-page__msg">Loading...</p></div>
  if (error)   return <div className="products-page"><p className="products-page__msg products-page__msg--error">{error}</p></div>

  return (
    <div className="products-page">
      <ProductGrid
        products={products}
        favorites={favorites}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

export default Products
