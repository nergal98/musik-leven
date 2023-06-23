import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./NavPrivado.css";

const Nav = ({ navRef }) => {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("token"); // Borra el token
    navigate("/"); // Redirige al home público
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav>
      <div className="hamburger" onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={isActive ? "active" : ""} ref={navRef}>
        <li>
          <Link to="/privado">Home</Link>
        </li>
        <li>
          <Link to="/privado/canciones-privado">Canciones</Link>
        </li>
        <li>
          <Link to="/privado/artistas-privado">Artistas</Link>
        </li>
        <li>
          <Link to="/privado/eventos-privado">Eventos</Link>
        </li>
        <li>
          <Link to="/">Home público</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
