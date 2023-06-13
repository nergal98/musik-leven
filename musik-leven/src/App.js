import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Contacto from './publica/paginas/estaticas/contacto/Contacto';
import Home from './publica/paginas/estaticas/home/Home';
import SobreNosotros from './publica/paginas/estaticas/sobre-nosotros/SobreNosotros';
import NotFound from './publica/paginas/estaticas/not-found/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;