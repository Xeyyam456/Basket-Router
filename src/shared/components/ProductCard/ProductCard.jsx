import { useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiTrash2 } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import './ProductCard.css'

function ProductCard({ product, onAddToCart, onToggleFavorite, onRemove, onIncrement, onDecrement, isFavorite = false, isInBasket = false, quantity }) {
  const navigate = useNavigate()
  const { id, title, description, price, rating, category, thumbnail } = product

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <img src={thumbnail} alt={title} className="product-card__img" loading="lazy" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__desc">{description}</p>
        <p className="product-card__category">Category: {category}</p>

        <div className="product-card__footer">
          <div className="product-card__info">
            <span className="product-card__price">
              ${quantity !== undefined ? (price * quantity).toFixed(2) : price}
            </span>
            {quantity !== undefined && quantity > 1 && (
              <span className="product-card__unit-price">${price} × {quantity}</span>
            )}
            <span className="product-card__rating">Rating: {rating}</span>
          </div>

          <div className="product-card__actions">
            {quantity === undefined && (
              <Button
                variant="ghost"
                className={`product-card__icon-btn product-card__icon-btn--cart${isInBasket ? ' product-card__icon-btn--cart-active' : ''}`}
                onClick={() => onAddToCart?.(product)}
                aria-label="Add to cart"
              >
                <FiShoppingCart size={18} />
              </Button>
            )}

            <Button
              variant="ghost"
              className={`product-card__icon-btn product-card__icon-btn--fav${
                isFavorite ? ' product-card__icon-btn--fav-active' : ''
              }`}
              onClick={() => onToggleFavorite?.(product)}
              aria-label="Toggle favorite"
            >
              <FiHeart size={18} />
            </Button>

            <Button
              variant="ghost"
              className="product-card__details-btn"
              onClick={() => navigate(`/products/${id}`)}
            >
              Go Details
            </Button>

            {onRemove && quantity === undefined && (
              <Button
                variant="ghost"
                className="product-card__icon-btn product-card__icon-btn--remove"
                onClick={() => onRemove?.(product)}
                aria-label="Remove"
              >
                <FiTrash2 size={18} />
              </Button>
            )}
          </div>

          {quantity !== undefined && (
            <div className="product-card__qty-row">
              <Button
                variant="ghost"
                className="product-card__qty-btn"
                onClick={() => onDecrement?.()}
                aria-label="Decrease"
              >−</Button>
              <span className="product-card__qty-count">{quantity}</span>
              <Button
                variant="ghost"
                className="product-card__qty-btn"
                onClick={() => onIncrement?.()}
                aria-label="Increase"
              >+</Button>
              {onRemove && (
                <Button
                  variant="ghost"
                  className="product-card__qty-remove"
                  onClick={() => onRemove?.(product)}
                  aria-label="Remove"
                >
                  <FiTrash2 size={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
