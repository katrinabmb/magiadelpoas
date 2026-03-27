import Footer from "../components/globalComponents/Footer";
import Navbar from "../components/globalComponents/Navbar";
import BannerPrincipal from "../components/homeComponents/BannerPrincipal";
import BarraReserva from "../components/homeComponents/BarraReserva";
import ListadoCabana from "../components/homeComponents/ListadoCabana";
import RestInfo from "../components/homeComponents/RestInfo";
import Testimonios from "../components/homeComponents/Testimonios";

const HomePage = () => {
  return (
    <div className="page">
      <Navbar />
      <BannerPrincipal />
      <BarraReserva />
      <ListadoCabana />
      <RestInfo />
      <Testimonios />
      <Footer />
    
    </div>
  )
}

export default HomePage
