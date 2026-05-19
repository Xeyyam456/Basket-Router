import Header from '@shared/components/Header/Header'
import Carousel from '@shared/components/Carousel/Carousel'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <Header />
      <main className="home__main">
        <div className="container">
          <Carousel />
        </div>
      </main>
    </div>
  )
}

export default Home
