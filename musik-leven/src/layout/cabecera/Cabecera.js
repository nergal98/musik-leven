import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Cabecera.css";

const Cabecera = () => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  // Detecta los clics fuera del menú y ciérralo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    // Escucha los clics en el documento
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Limpiar el listener al desmontar
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <header>
      <h1>MUSIK LEVEN</h1>
      <nav>
        <div className="hamburger" onClick={toggleNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={isActive ? "active" : ""} ref={navRef}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sobre-nosotros">Quiénes somos</Link>
          </li>
          <li>
            <div className="dropdown">
              <a href="#!" className="dropbtn">
                {" "}
                Secciones
                <i className="fa fa-caret-down"></i>
              </a>
              <div className="dropdown-content">
                <Link to="/canciones">Canciones</Link>
                <Link to="/artistas">Artistas</Link>
                <Link to="/eventos">Eventos</Link>
              </div>
            </div>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Cabecera;
