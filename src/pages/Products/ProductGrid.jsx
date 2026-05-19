import ProductCard from '@shared/components/ProductCard/ProductCard'
import './ProductGrid.css'

function ProductGrid({ products, favorites = [], onAddToCart, onToggleFavorite }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default ProductGrid
