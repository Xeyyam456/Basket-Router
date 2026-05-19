import useTitle from '@hooks/useTitle'
import './Basket.css'

function Basket() {
  useTitle('Basket')
  return (
    <div className="basket-page">
      <h1>Basket</h1>
    </div>
  )
}

export default Basket
