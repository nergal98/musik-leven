import React, { useRef } from "react";
import Nav from "./nav-privado/NavPrivado";
import "./CabeceraPrivada.css";

const CabeceraPrivada = () => {
  const navRef = useRef();

  return (
    <div>
      <header>
        <h1>MUSIK LEVEN</h1>
        <Nav navRef={navRef} />
      </header>
      <div className="content-wrapper"> 
      </div>
    </div>
  );
};

export default CabeceraPrivada;