import Navbar from "../components/globalComponents/Navbar";
import BannerPrincipal from "../components/homeComponents/BannerPrincipal";
import BarraReserva from "../components/homeComponents/BarraReserva";
import ListadoCabana from "../components/homeComponents/ListadoCabana";

const HomePage = () => {
  return (
    <div className="page">
      <Navbar />
      <BannerPrincipal />
      <BarraReserva />
      <ListadoCabana />
    
    </div>
  )
}

export default HomePage
