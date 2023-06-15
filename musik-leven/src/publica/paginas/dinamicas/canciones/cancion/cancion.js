import React from 'react';
import { useParams } from 'react-router-dom';
import canciones from '../../../../../data/canciones';
import './cancion.css';

const CancionItem = () => {
  const { id } = useParams();
  
  // Busca la cancion correspondiente a este ID en tus datos
  const cancionItem = canciones.find(cancion => cancion.id === parseInt(id));

  if (!cancionItem) {
    return <p>Cancion no encontrada</p>;
  }

  return (
    <div className="song-item">
      <h1 className="song-title">{cancionItem.nombre}</h1>
      <div className="song-details">
        <p>Artista: {cancionItem.artista}</p>
        <p>Duración: {cancionItem.duracion}</p>
        <p>Género: {cancionItem.genero}</p>
        <p>Fecha de salida: {new Date(cancionItem.fechasalida).toLocaleDateString()}</p>
        <p className="lyrics">Lyrics: {cancionItem.lyrics}</p>
      </div>
    </div>
  );
}

export default CancionItem;