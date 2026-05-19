import { lazy, Suspense } from 'react'
import useTitle from '@hooks/useTitle'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import styles from './Home.module.css'

const Carousel = lazy(() => import('@shared/components/Carousel/Carousel'))

function Home() {
  useTitle('Home')
  return (
    <div className={styles.home}>
      <main className={styles['home__main']}>
        <Suspense fallback={<LoadingBar />}>
          <Carousel />
        </Suspense>
      </main>
    </div>
  )
}

export default Home
