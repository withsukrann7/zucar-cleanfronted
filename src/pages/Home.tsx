import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import KodSorgulamaBox from '../components/KodSorgulamaBox'
import HizmetlerSlider from '../components/HizmetlerSlider'
import Yorumlar from '../components/Yorumlar'
import IletisimFormu from '../components/IletisimFormu'
import Harita from '../components/Harita'

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <KodSorgulamaBox />
      <HizmetlerSlider />
      <Yorumlar />
      <IletisimFormu />
      <Harita />
      <Footer />
    </>
  )
}

export default Home
