import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaEventos.css";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const loadEventos = () => {
      try {
        const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        setEventos(eventos);
      } catch (e) {
        console.error("Error parsing eventos from localStorage:", e);
        setEventos([]);
      }
    };
    loadEventos();
  }, []);

  const handleDelete = (index) => {
    let eventosCopy = [...eventos];
    eventosCopy.splice(index, 1);
    localStorage.setItem("eventos", JSON.stringify(eventosCopy));
    setEventos(eventosCopy); // actualiza el estado directamente con la lista modificada
  };

  if (eventos.length === 0) {
    return (
      <div className="lista-eventos-container">
        <p>No hay eventos para listar.</p>
        <Link className="crear-nuevo" to={`/privado/eventos-privado/nuevo`}>
          Crear nuevo evento
        </Link>
      </div>
    );
  }

  return (
    <div className="lista-eventos-container">
       <Link className="crear-nuevo" to={`/privado/eventos-privado/nuevo`}>
        Crear nuevo evento
      </Link>
      <ul>
        {eventos.map((evento, index) => (
          <li key={index}>
            {evento.lugar} - {evento.ciudad} - {evento.genero} -{" "}
            {evento.organizador}
            <div className="botones">
              <button onClick={() => handleDelete(index)}>Eliminar</button>
              <Link to={`/privado/eventos-privado/editar/${index}`}>
                Editar
              </Link>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default ListaEventos;
