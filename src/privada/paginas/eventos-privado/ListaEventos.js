import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEventsPerPage, setCurrentEventsPage } from "../../../redux/actions"; // Asegúrate de que la ruta sea correcta
import "./ListaEventos.css";

import Modal from "../../utilidades/modal/Modal";
import Pagination from "../../utilidades/paginator/Pagination";
import EventService from "../../../servicios/EventService";

// Tu componente principal
const ListaEventos = () => {
  // Estados
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);
  const currentPage = useSelector((state) => state.currentEventsPage);

  // Usa el estado de Redux en lugar de useState
  const dispatch = useDispatch();
  const eventsPerPage = useSelector((state) => state.eventsPerPage);

  const maxPageNums = 5;
  const totalPages = Math.ceil(eventos.length / eventsPerPage);

  // Lógica de paginación
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventos.slice(indexOfFirstEvent, indexOfLastEvent);

  // Actualizar la página actual en Redux
  const updateCurrentPage = (pageNum) => {
    dispatch(setCurrentEventsPage(pageNum));
  };

  // Carga de eventos
  useEffect(() => {
    const loadEventos = async () => {
      try {
        const eventos = await EventService.getAllEvents();
        setEventos(eventos);
      } catch (e) {
        console.error("Error loading eventos:", e);
        setEventos([]);
      }
    };
    loadEventos();
  }, []);

  useEffect(() => {
    setCurrentEventsPage((oldPage) => {
      const newTotalPages = Math.ceil(eventos.length / eventsPerPage);
      return Math.min(oldPage, newTotalPages);
    });
  }, [eventsPerPage]);

  useEffect(() => {
    const newTotalPages = Math.ceil(eventos.length / eventsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentEventsPage(newTotalPages);
    } else if (currentPage < 1 && newTotalPages > 0) {
      setCurrentEventsPage(1);
    }
  }, [eventos, eventsPerPage, currentPage]);

  const handleDelete = (index) => {
    // Calcula el índice correcto en la lista de todos los eventos
    const realIndex = currentPage * eventsPerPage - eventsPerPage + index;
    setModalOpen(true);
    setEventoToDelete(eventos[realIndex].id); // Aquí se hace el cambio
  };

  const confirmDelete = async () => {
    await EventService.deleteEvent(eventoToDelete);
    const eventosCopy = [...eventos];
    const realIndex = eventos.findIndex(
      (evento) => evento.id === eventoToDelete
    );
    eventosCopy.splice(realIndex, 1);
    setEventos(eventosCopy);
    setModalOpen(false);

    // Añade esto para revisar si la página actual se quedó vacía
    const newTotalPages = Math.ceil(eventosCopy.length / eventsPerPage);
    if (currentPage > newTotalPages) {
      dispatch(setCurrentEventsPage(newTotalPages));
    }
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
          const realIndex = currentPage * eventsPerPage - eventsPerPage + index;
          return (
            <li key={realIndex}>
              {realIndex + 1} - {evento.nombre} - {evento.fecha}
              <div className="botones">
                <button onClick={() => handleDelete(index)}>Eliminar</button>
                <Link to={`/privado/eventos-privado/editar/${evento.id}`}>
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
        setCurrentPage={updateCurrentPage}
        eventsPerPage={eventsPerPage}
        setEventsPerPage={(value) => dispatch(setEventsPerPage(value))}
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
          onChange={(e) => {
            const newEventsPerPage = Number(e.target.value);
            dispatch(setEventsPerPage(newEventsPerPage));

            // Comprueba si la página actual es válida
            const newTotalPages = Math.ceil(eventos.length / newEventsPerPage);
            if (currentPage > newTotalPages) {
              dispatch(setCurrentEventsPage(newTotalPages));
            }
          }}
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
