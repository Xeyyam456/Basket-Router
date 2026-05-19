import { lazy, Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { FiTruck, FiShield, FiRotateCcw, FiHeadphones } from 'react-icons/fi'
import useTitle from '@hooks/useTitle'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import styles from './Home.module.css'

const Carousel = lazy(() => import('@shared/components/Carousel/Carousel'))

const features = [
  { icon: <FiTruck size={22} />,       title: 'Free Delivery',    sub: 'On all orders over $50' },
  { icon: <FiShield size={22} />,      title: 'Secure Payment',   sub: '100% protected transactions' },
  { icon: <FiRotateCcw size={22} />,   title: 'Easy Returns',     sub: '30-day hassle-free returns' },
  { icon: <FiHeadphones size={22} />,  title: '24/7 Support',     sub: 'Always here when you need us' },
]

function Home() {
  useTitle('Home')
  return (
    <div className={styles.home}>
      <main className={styles['home__main']}>
        <Suspense fallback={<LoadingBar />}>
          <Carousel />
        </Suspense>
      </main>

      <section className={styles['home__features']}>
        {features.map(f => (
          <div key={f.title} className={styles['home__feature']}>
            <div className={styles['home__feature-icon']}>{f.icon}</div>
            <div>
              <h3 className={styles['home__feature-title']}>{f.title}</h3>
              <p className={styles['home__feature-sub']}>{f.sub}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home
