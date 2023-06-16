import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaEventos.css";
import Modal from "../Modal";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Nuevo estado para controlar la apertura del modal
  const [eventoToDelete, setEventoToDelete] = useState(null); // Nuevo estado para almacenar el evento a eliminar

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
    setModalOpen(true);
    setEventoToDelete(index);
  };

  const confirmDelete = () => {
    let eventosCopy = [...eventos];
    eventosCopy.splice(eventoToDelete, 1);
    localStorage.setItem("eventos", JSON.stringify(eventosCopy));
    setEventos(eventosCopy);
    setModalOpen(false);
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
        {eventos.map((evento, index) => {
          return (
            <li key={index}>
              {/* Para cuando escalemos a base de datos simulada o real */}
              {/* {evento.id} - {evento.nombre} - {evento.fecha} */}
              {index + 1} - {evento.nombre} - {evento.fecha}
              <div className="botones">
                <button onClick={() => handleDelete(index)}>Eliminar</button>
                <Link to={`/privado/eventos-privado/editar/${index}`}>
                  Editar
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar este evento?</p>
        <button className="confirm-button" onClick={confirmDelete}>
          Confirmar
        </button>
        <button className="cancel-button" onClick={() => setModalOpen(false)}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default ListaEventos;
