import { useState, useEffect } from 'react'
import { productService } from '@services/productService'
import { notifyError } from '@utils/toastHandlers'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    productService
      .getAll()
      .then(data => setProducts(data.products))
      .catch(err => {
        setError(err.message)
        notifyError('Məhsullar yüklənilə bilmədi')
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

export default useProducts
