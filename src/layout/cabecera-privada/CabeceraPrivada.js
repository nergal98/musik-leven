// Cabecera.js
import React, { useRef } from "react";
import Nav from "./nav-privado/NavPrivado";

const CabeceraPrivada = () => {
  const navRef = useRef();

  return (
    <header>
      <h1>MUSIK LEVEN</h1>
      <Nav navRef={navRef} />
    </header>
  );
};

export default CabeceraPrivada;
