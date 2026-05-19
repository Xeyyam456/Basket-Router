import { useParams } from 'react-router-dom'
import useTitle from '@hooks/useTitle'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  useTitle(`Product ${id}`)

  return (
    <div className="product-detail-page">
      <h1>Product {id}</h1>
    </div>
  )
}

export default ProductDetail
