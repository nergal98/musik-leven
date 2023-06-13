import React from "react";
import { Link } from "react-router-dom";
import eventos from "../../../../data/eventos";
import "./eventos.css";

const EventList = () => {
  return (
    <div className="event-list">
      <h1>Eventos</h1>
      <ul>
        {eventos.map((eventItem) => (
          <li key={eventItem.id}>
            <Link to={`/eventos/${eventItem.id}`}>{eventItem.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;