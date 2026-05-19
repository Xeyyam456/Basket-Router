import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft, FiTag, FiPackage } from 'react-icons/fi'
import useTitle from '@hooks/useTitle'
import { useBasket } from '@store/basketStore'
import { useFavorites } from '@store/favoritesStore'
import { productService } from '@services/productService'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import Button from '@shared/components/Button/Button'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeImg, setActiveImg] = useState(0)

  const { basket, toggle: toggleBasket } = useBasket()
  const { favorites, toggle: toggleFavorite } = useFavorites()

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    onSuccess: () => setActiveImg(0),
  })

  useTitle(product ? product.title : `Product ${id}`)

  if (isLoading) return <LoadingBar />

  if (!product) return (
    <div className="product-detail-page">
      <p className="product-detail__error">Məhsul tapılmadı</p>
    </div>
  )

  const inBasket   = basket.some(b => b.id === product.id)
  const isFav      = favorites.some(f => f.id === product.id)
  const discounted = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null
  const stars = Math.round(product.rating ?? 0)

  return (
    <div className="product-detail-page">
      <button className="product-detail__back" onClick={() => navigate(-1)}>
        <FiArrowLeft size={16} /> Back
      </button>

      <div className="product-detail__grid">

        {/* ── Gallery ── */}
        <div className="product-detail__gallery">
          <div className="product-detail__main-img-wrap">
            <img
              src={product.images?.[activeImg] ?? product.thumbnail}
              alt={product.title}
              className="product-detail__main-img"
            />
            {product.discountPercentage > 0 && (
              <span className="product-detail__discount-badge">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="product-detail__thumbs">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className={`product-detail__thumb${activeImg === i ? ' product-detail__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="product-detail__info">
          <span className="product-detail__category">{product.category}</span>
          <h1 className="product-detail__title">{product.title}</h1>
          {product.brand && <p className="product-detail__brand">by {product.brand}</p>}

          <div className="product-detail__rating">
            <div className="product-detail__stars">
              {Array.from({ length: 5 }, (_, i) => (
                <FiStar
                  key={i}
                  size={18}
                  className={i < stars ? 'pd-star--filled' : 'pd-star--empty'}
                />
              ))}
            </div>
            <span className="product-detail__rating-val">{product.rating}</span>
          </div>

          <div className="product-detail__price-wrap">
            <span className="product-detail__price">${discounted ?? product.price}</span>
            {discounted && (
              <span className="product-detail__original-price">${product.price}</span>
            )}
          </div>

          <p className="product-detail__desc">{product.description}</p>

          <div className="product-detail__meta">
            <span className="product-detail__stock">
              <FiPackage size={13} /> Stock: {product.stock}
            </span>
            {product.tags?.map(tag => (
              <span key={tag} className="product-detail__tag">
                <FiTag size={11} /> {tag}
              </span>
            ))}
          </div>

          <div className="product-detail__actions">
            <Button
              variant="ghost"
              className={`pd-btn pd-btn--cart${inBasket ? ' pd-btn--cart-active' : ''}`}
              onClick={() => toggleBasket(product)}
            >
              <FiShoppingCart size={17} />
              {inBasket ? 'In Basket' : 'Add to Basket'}
            </Button>

            <Button
              variant="ghost"
              className={`pd-btn pd-btn--fav${isFav ? ' pd-btn--fav-active' : ''}`}
              onClick={() => toggleFavorite(product)}
            >
              <FiHeart size={17} />
              {isFav ? 'Saved' : 'Favorite'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail

