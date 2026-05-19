import { useParams } from 'react-router-dom'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()

  return (
    <div className="product-detail-page">
      <h1>Product #{id}</h1>
    </div>
  )
}

export default ProductDetail
