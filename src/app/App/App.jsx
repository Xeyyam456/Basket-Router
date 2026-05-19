import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@shared/components/Layout/Layout'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import styles from './App.module.css'

const Home = lazy(() => import('@pages/Home/Home'))
const Products = lazy(() => import('@pages/Products/Products'))
const ProductDetail = lazy(() => import('@pages/ProductDetail/ProductDetail'))
const Favorites = lazy(() => import('@pages/Favorites/Favorites'))
const Basket = lazy(() => import('@pages/Basket/Basket'))
const NotFound = lazy(() => import('@pages/NotFound/NotFound'))

function App() {
  return (
    <div className={styles.app}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<LoadingBar />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/basket" element={<Basket />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
