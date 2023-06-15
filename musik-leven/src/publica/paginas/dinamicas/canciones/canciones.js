import React from "react";
import { Link } from "react-router-dom";
import canciones from "../../../../data/canciones";
import "./canciones.css";

const CancionesList = () => {
    return (
        <div className="song-list">
            <h1>Canciones</h1>
            <ul>
                {canciones.map((cancion) => (
                    <li key={cancion.id}>
                        <Link to={`/canciones/${cancion.id}`}>{cancion.nombre} - {cancion.artista}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CancionesList;