import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './evento.css';
import EventService from '../../../../../servicios/EventService';

const EventItem = () => {
  const { id } = useParams();
  const [eventItem, setEventItem] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await EventService.getEventById(id);
        setEventItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!eventItem) {
    return <p>Evento no encontrado</p>;
  }

  return (
    <div className="event-item">
      <h1 className="event-title">{eventItem.nombre}</h1>
      <p className="event-desc">{eventItem.descripcion}</p>
      <div className="event-details">
        <p>Lugar: {eventItem.lugar}</p>
        <p>Genero: {eventItem.genero}</p>
        <p>Ciudad: {eventItem.ciudad}</p>
        <p>Precio: {eventItem.precio}</p>
        <p>Fecha: {new Date(eventItem.fecha).toLocaleDateString()}</p>
        <p>Organizador: {eventItem.organizador}</p>
      </div>
      <img className="event-img" src={eventItem.imagen} alt={eventItem.nombre}/>
    </div>
  );
}

export default EventItem;