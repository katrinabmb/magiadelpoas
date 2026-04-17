import Footer from "../components/globalComponents/Footer";
import Navbar from "../components/globalComponents/Navbar";
import BannerPrincipal from "../components/homeComponents/BannerPrincipal";
import BarraReserva from "../components/homeComponents/BarraReserva";
import ListadoCabana from "../components/homeComponents/ListadoCabana";
import RestInfo from "../components/homeComponents/RestInfo";
import Testimonios from "../components/homeComponents/Testimonios";

const HomePage = () => {
  return (
    <div className="page" id="home">
      <Navbar />
      <BannerPrincipal />

      <section id="reservar" className="anchor-section">
        <BarraReserva />
      </section>

      <section id="cabanas" className="anchor-section">
        <ListadoCabana />
      </section>

      <section id="restaurante" className="anchor-section">
        <RestInfo />
      </section>

      <section id="testimonios" className="anchor-section">
        <Testimonios />
      </section>
      <Footer />
    
    </div>
  )
}

export default HomePage
