import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ navRef }) => {
  const [isActive, setIsActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsActive(false);
        setDropdownActive(false); // Añadir esta línea
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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sobre-nosotros">Quiénes somos</Link>
        </li>
        <li>
          <div
            className="dropdown"
            onClick={() => setDropdownActive(!dropdownActive)}
          >
            <a href="#!" className="dropbtn">
              {" "}
              Secciones
              <i className="fa fa-caret-down"></i>
            </a>
            {dropdownActive && (
              <div className="dropdown-content">
                <Link to="/canciones">Canciones</Link>
                <Link to="/artistas">Artistas</Link>
                <Link to="/eventos">Eventos</Link>
              </div>
            )}
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
  );
};

export default Nav;
