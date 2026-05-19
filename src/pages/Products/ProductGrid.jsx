import { memo } from 'react'
import ProductCard from '@shared/components/ProductCard/ProductCard'
import './ProductGrid.css'

function ProductGrid({ products, favorites = [], basket = [], onAddToCart, onToggleFavorite, onRemove, getQuantity, onIncrement, onDecrement }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.some(f => f.id === product.id)}
          isInBasket={basket.some(b => b.id === product.id)}
          quantity={getQuantity ? getQuantity(product.id) : undefined}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemove}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </div>
  )
}

export default memo(ProductGrid)
