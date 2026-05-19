import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@shared/components/Layout/Layout'
import LoadingBar from '@shared/components/LoadingBar/LoadingBar'
import './App.css'

const Home          = lazy(() => import('@pages/Home/Home'))
const Products      = lazy(() => import('@pages/Products/Products'))
const ProductDetail = lazy(() => import('@pages/ProductDetail/ProductDetail'))
const Favorites     = lazy(() => import('@pages/Favorites/Favorites'))
const Basket        = lazy(() => import('@pages/Basket/Basket'))

function App() {
  return (
    <Suspense fallback={<LoadingBar />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/products"       element={<Products />} />
          <Route path="/products/:id"   element={<ProductDetail />} />
          <Route path="/favorites"      element={<Favorites />} />
          <Route path="/basket"         element={<Basket />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
