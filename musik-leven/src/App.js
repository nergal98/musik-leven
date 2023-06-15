import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Contacto from "./publica/paginas/estaticas/contacto/Contacto";
import Home from "./publica/paginas/estaticas/home/Home";
import SobreNosotros from "./publica/paginas/estaticas/sobre-nosotros/SobreNosotros";
import NotFound from "./publica/paginas/estaticas/not-found/NotFound";
import Cabecera from "./layout/cabecera/Cabecera";
import Footer from "./layout/footer/Footer";
import Canciones from "./publica/paginas/dinamicas/canciones/canciones";
import Cancion from "./publica/paginas/dinamicas/canciones/cancion/cancion";
import Eventos from "./publica/paginas/dinamicas/eventos/eventos";
import Evento from "./publica/paginas/dinamicas/eventos/evento/evento";
import Artistas from "./publica/paginas/dinamicas/artistas/artistas";
import Artista from "./publica/paginas/dinamicas/artistas/artista/artista";
import "./App.css";
import CabeceraPrivada from "./layout-privado/cabecera-privada/CabeceraPrivada";
import EventosPrivados from "./privada/eventos-privado/EventosPrivados";

function MainContent() {
  const location = useLocation();

  let cabecera;
  if (location.pathname.startsWith('/privado')) {
    cabecera = <CabeceraPrivada />;
  } else {
    cabecera = <Cabecera />;
  }

  return (
    <div className="App">
      {cabecera}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privado" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/artistas/:id" element={<Artista />} />
        <Route path="/eventos/:id" element={<Evento />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      
        
        <Route path="/privado/eventos-privado" element={<EventosPrivados />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}








function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;