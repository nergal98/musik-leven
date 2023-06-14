// Cabecera.js
import React, { useRef } from "react";
import Nav from "./nav/Nav";

const Cabecera = () => {
  const navRef = useRef();

  return (
    <header>
      <h1>MUSIK LEVEN</h1>
      <Nav navRef={navRef} />
    </header>
  );
};

export default Cabecera;
