import React from 'react';
import { useParams } from 'react-router-dom';
import artistas from '../../../../../data/artistas';
import './artista.css';

const ArtistaItem = () => {
    const { id } = useParams();

    // Busca el artista correspondiente a este ID en tus datos
    const artistaItem = artistas.find(artista => artista.id === parseInt(id));

    if (!artistaItem) {
        return <p>Artista no encontrado</p>;
    }

    return (
        <div className="artist-item">
            <h1 className="artist-title">{`${artistaItem.nombre}  ${artistaItem.apellidos}`}</h1>
            <div className="artist-details">
                <p>Bio: {artistaItem.bio}</p>
                <p>Año nacimiento: {new Date(artistaItem.anioNac).toLocaleDateString()}</p>
                <p>País de origen: {artistaItem.paisOrigen}</p>
                <p>Álbumes: {artistaItem.albumes}</p>
            </div>
            <img className="artist-img" src={artistaItem.foto} alt={artistaItem.nombre} />
        </div>
    );
}

export default ArtistaItem;