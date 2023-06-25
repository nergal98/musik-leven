import React from "react";

import "./PrivateHomePage.css";
import EventService from "../../../servicios/EventService";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivateHomePage() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventos = await EventService.getAllEvents();
        setEventos(eventos);
      } catch (error) {
        console.error("Hubo un error al cargar los eventos", error);
      }
    };

    fetchEventos();
  }, []);

  const handleManageEvent = (id) => {
    navigate(`/privado/eventos-privado/editar/${id}`);
  };

  return (
    <div className="private-home-page">
      {/* ... otros componentes */}
      <div className="container__flex">
        {eventos.map((evento) => (
          <div className="cardFilm" key={evento.id}>
            <img src={evento.imagen} alt={evento.nombre} />
            <button onClick={() => handleManageEvent(evento.id)}>
              Gestionar {evento.nombre}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivateHomePage;
