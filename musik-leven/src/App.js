import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contacto from "./publica/paginas/estaticas/contacto/Contacto";
import Home from "./publica/paginas/estaticas/home/Home";
import SobreNosotros from "./publica/paginas/estaticas/sobre-nosotros/SobreNosotros";
import NotFound from "./publica/paginas/estaticas/not-found/NotFound";
import Cabecera from "./layout/cabecera/Cabecera";
import Footer from "./layout/footer/Footer";
import Eventos from "./publica/paginas/dinamicas/eventos/eventos";
import Evento from "./publica/paginas/dinamicas/eventos/evento";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Cabecera />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<Evento />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
