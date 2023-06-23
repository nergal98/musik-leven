// Nav.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavPrivado.css";

const Nav = ({ navRef }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
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
      </ul>
    </nav>
  );
};

export default Nav;
