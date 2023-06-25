import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./eventos.css";
import EventService from "../../../../servicios/EventService";

const EventList = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAllEvents();
        setEventos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      <h1>Eventos</h1>
      <div className="event-grid">
        {eventos.map((eventItem) => (
          <div className="event-card" key={eventItem.id}>
            <img src={eventItem.imagen} alt={eventItem.nombre} />
            <Link to={`/eventos/${eventItem.id}`}>{eventItem.nombre}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;