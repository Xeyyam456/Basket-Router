import { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './Carousel.module.css'

const slides = [
  { id: 1, src: 'https://picsum.photos/seed/basket1/900/450', alt: 'Slide 1' },
  { id: 2, src: 'https://picsum.photos/seed/basket2/900/450', alt: 'Slide 2' },
  { id: 3, src: 'https://picsum.photos/seed/basket3/900/450', alt: 'Slide 3' },
  { id: 4, src: 'https://picsum.photos/seed/basket4/900/450', alt: 'Slide 4' },
  { id: 5, src: 'https://picsum.photos/seed/basket5/900/450', alt: 'Slide 5' },
]

function Carousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.carousel}>
      <div
        className={styles['carousel__track']}
        style={{ '--translate': `-${active * 100}%` }}
      >
        {slides.map(slide => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className={styles['carousel__slide']}
          />
        ))}
      </div>

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
