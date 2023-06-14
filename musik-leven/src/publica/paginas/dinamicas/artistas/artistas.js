import React from "react";
import { Link } from "react-router-dom";
import artistas from "../../../../data/artistas";
import "./artistas.css";

const ArtistasList = () => {
    return (
        <div className="artist-list">
            <h2>Artistas</h2>
            <ul>
                {artistas.map((artista) => (
                    <li key={artista.id}>
                        <Link to={`/artistas/${artista.id}`}>{`${artista.nombre}  ${artista.apellidos}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArtistasList;