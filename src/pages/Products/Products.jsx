import useTitle from '@hooks/useTitle'
import './Products.css'

function Products() {
  useTitle('Products')
  return (
    <div className="products-page">
      <h1>Products</h1>
    </div>
  )
}

export default Products
