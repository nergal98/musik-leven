import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaEventos.css";

import Modal from "../utilidades/modal/Modal";
import Pagination from "../utilidades/paginator/Pagination";

// Tu componente principal
const ListaEventos = () => {
  // Estados
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(5);

  const maxPageNums = 5;
  const totalPages = Math.ceil(eventos.length / eventsPerPage);

  // Lógica de paginación
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventos.slice(indexOfFirstEvent, indexOfLastEvent);

  // Carga de eventos
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
  useEffect(() => {
    setCurrentPage((oldPage) => {
      const newTotalPages = Math.ceil(eventos.length / eventsPerPage);
      return Math.min(oldPage, newTotalPages);
    });
  }, [eventsPerPage]);

  useEffect(() => {
    const newTotalPages = Math.ceil(eventos.length / eventsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    } else if (currentPage < 1 && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [eventos, eventsPerPage, currentPage]);

  const handleDelete = (index) => {
    // Calcula el índice correcto en la lista de todos los eventos
    const realIndex = currentPage * eventsPerPage - eventsPerPage + index;
    setModalOpen(true);
    setEventoToDelete(realIndex);
  };
  const confirmDelete = () => {
    let eventosCopy = [...eventos];
    eventosCopy.splice(eventoToDelete, 1);
    localStorage.setItem("eventos", JSON.stringify(eventosCopy));
    setEventos(eventosCopy);
    setModalOpen(false);
  };

  // Renderizado
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
        {currentEvents.map((evento, index) => {
          // Calcula el índice correcto en la lista de todos los eventos
          const realIndex = currentPage * eventsPerPage - eventsPerPage + index;

          return (
            <li key={realIndex}>
              {realIndex + 1} - {evento.nombre} - {evento.fecha}
              <div className="botones">
                <button onClick={() => handleDelete(index)}>Eliminar</button>
                <Link to={`/privado/eventos-privado/editar/${realIndex}`}>
                  Editar
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        eventsPerPage={eventsPerPage}
        setEventsPerPage={setEventsPerPage}
        maxPageNums={maxPageNums}
      />
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
      <div>
        <label htmlFor="eventsPerPage">Eventos por página: </label>
        <select
          name="eventsPerPage"
          id="eventsPerPage"
          value={eventsPerPage}
          onChange={(e) => setEventsPerPage(Number(e.target.value))}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};
export default ListaEventos;
