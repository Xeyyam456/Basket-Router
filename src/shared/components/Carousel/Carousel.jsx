import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Carousel.module.css'

const slides = [
  {
    id: 1,
    img: 'https://picsum.photos/seed/shop1/1920/1080',
    badge: 'New Collection',
    title: 'Discover\nYour Style',
    sub: 'Thousands of products at unbeatable prices',
  },
  {
    id: 2,
    img: 'https://picsum.photos/seed/shop2/1920/1080',
    badge: 'Best Sellers',
    title: 'Top Picks\nJust for You',
    sub: 'Handpicked favorites from our community',
  },
  {
    id: 3,
    img: 'https://picsum.photos/seed/shop3/1920/1080',
    badge: 'Limited Offer',
    title: "Deals You\nCan't Miss",
    sub: 'Up to 50% off on selected items',
  },
]

function Carousel() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const prev = () => setActive(p => (p - 1 + slides.length) % slides.length)
  const next = () => setActive(p => (p + 1) % slides.length)

  return (
    <div className={styles.carousel}>
      <div
        className={styles['carousel__track']}
        style={{ '--translate': `-${active * 100}%` }}
      >
        {slides.map(slide => (
          <div key={slide.id} className={styles['carousel__slide']}>
            <img src={slide.img} alt={slide.badge} className={styles['carousel__img']} />
            <div className={styles['carousel__overlay']} />
            <div className={styles['carousel__content']}>
              <span className={styles['carousel__badge']}>{slide.badge}</span>
              <h2 className={styles['carousel__title']}>{slide.title}</h2>
              <p className={styles['carousel__sub']}>{slide.sub}</p>
              <button
                className={styles['carousel__cta']}
                onClick={() => navigate('/products')}
              >
                Shop Now →
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={clsx(styles['carousel__arrow'], styles['carousel__arrow--prev'])}
        onClick={prev}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className={clsx(styles['carousel__arrow'], styles['carousel__arrow--next'])}
        onClick={next}
        aria-label="Next"
      >
        ›
      </button>

      <div className={styles['carousel__dots']}>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            className={clsx(styles['carousel__dot'], i === active && styles['carousel__dot--active'])}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
