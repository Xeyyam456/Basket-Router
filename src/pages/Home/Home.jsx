import Carousel from '@shared/components/Carousel/Carousel'
import useTitle from '@hooks/useTitle'
import './Home.css'

function Home() {
  useTitle('Home')
  return (
    <div className="home">
      <main className="home__main">
        <Carousel />
      </main>
    </div>
  )
}

export default Home
