import React from 'react';
import { useParams } from 'react-router-dom';
import eventos from '../../../../data/eventos';
import './evento.css';

const EventItem = () => {
  const { id } = useParams();
  
  // Busca el evento correspondiente a este ID en tus datos
  const eventItem = eventos.find(evento => evento.id === parseInt(id));

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
      <img className="event-img" src={eventItem.foto} alt={eventItem.nombre}/>
    </div>
  );
}

export default EventItem;