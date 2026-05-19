import { Routes, Route } from 'react-router-dom'
import Layout from '@shared/components/Layout/Layout'
import Home from '@pages/Home/Home'
import Products from '@pages/Products/Products'
import ProductDetail from '@pages/ProductDetail/ProductDetail'
import Favorites from '@pages/Favorites/Favorites'
import Basket from '@pages/Basket/Basket'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/basket" element={<Basket />} />
      </Route>
    </Routes>
  )
}

export default App
