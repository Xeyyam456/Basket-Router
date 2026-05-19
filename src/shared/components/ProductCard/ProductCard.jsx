import { useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import './ProductCard.css'

function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite = false }) {
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
            <span className="product-card__price">${price}</span>
            <span className="product-card__rating">Rating: {rating}</span>
          </div>

          <div className="product-card__actions">
            <Button
              variant="ghost"
              className="product-card__icon-btn product-card__icon-btn--cart"
              onClick={() => onAddToCart?.(product)}
              aria-label="Add to cart"
            >
              <FiShoppingCart size={18} />
            </Button>

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
