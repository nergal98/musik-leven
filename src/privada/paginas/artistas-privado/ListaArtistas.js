import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaArtistas.css";

import Modal from "../../utilidades/modal/Modal";
import Pagination from "../../utilidades/paginator/Pagination";

const ListaArtistas = () => {

    // Estados
    const [artistas, setArtistas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [artistaToDelete, setArtistaToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [artistasPerPage, setArtistasPerPage] = useState(5);

    const maxPageNums = 5;
    const totalPages = Math.ceil(artistas.length / artistasPerPage);

    // Lógica de paginación
    const indexOfLastEvent = currentPage * artistasPerPage;
    const indexOfFirstEvent = indexOfLastEvent - artistasPerPage;
    const currentArtistas = artistas.slice(indexOfFirstEvent, indexOfLastEvent);


    // Carga de artistas
    useEffect(() => {
        const loadArtistas = () => {
            try {
                const artistas = JSON.parse(localStorage.getItem("artistas")) || [];
                setArtistas(artistas);
            } catch (e) {
                console.error("Error parsing artistas from localStorage:", e);
                setArtistas([]);
            }
        };
        loadArtistas();
    }, []);

    useEffect(() => {
        setCurrentPage((oldPage) => {
            const newTotalPages = Math.ceil(artistas.length / artistasPerPage);
            return Math.min(oldPage, newTotalPages);
        });
    }, [artistasPerPage]);

    useEffect(() => {
        const newTotalPages = Math.ceil(artistas.length / artistasPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        } else if (currentPage < 1 && newTotalPages > 0) {
            setCurrentPage(1);
        }
    }, [artistas, artistasPerPage, currentPage]);

    const handleDelete = (index) => {
        // Calcula el índice correcto en la lista de todos los artistas
        const realIndex = currentPage * artistasPerPage - artistasPerPage + index;
        setModalOpen(true);
        setArtistaToDelete(realIndex);
    };
    const confirmDelete = () => {
        let artistasCopy = [...artistas];
        artistasCopy.splice(artistaToDelete, 1);
        localStorage.setItem("artistas", JSON.stringify(artistasCopy));
        setArtistas(artistasCopy);
        setModalOpen(false);
    };

    // Renderizado
    if (artistas.length === 0) {
        return (
            <div className="lista-artistas-container">
                <p>No hay artistas para listar.</p>
                <Link className="crear-nuevo" to={`/privado/artistas-privado/nuevo`}>
                    Crear nuevo artista
                </Link>
            </div>
        );
    }

    return (
        <div className="lista-artistas-container">
            <Link className="crear-nuevo" to={`/privado/artistas-privado/nuevo`}>
                Crear nuevo artista
            </Link>
            <ul>
                {currentArtistas.map((artista, index) => {
                    // Calcula el índice correcto en la lista de todos los artistas
                    const realIndex = currentPage * artistasPerPage - artistasPerPage + index;

                    return (
                        <li key={realIndex}>
                            {realIndex + 1} - {artista.nombre} {artista.apellidos} - {artista.anioNac}
                            <div className="botones">
                                <button onClick={() => handleDelete(index)}>Eliminar</button>
                                <Link to={`/privado/artistas-privado/editar/${realIndex}`}>
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
                setCurrentPage={setCurrentPage}
                artistasPerPage={artistasPerPage}
                setArtistasPerPage={setArtistasPerPage}
                maxPageNums={maxPageNums}
            />
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>Confirmar eliminación</h2>
                <p>¿Estás seguro de que quieres eliminar este artista?</p>
                <button className="confirm-button" onClick={confirmDelete}>
                    Confirmar
                </button>
                <button className="cancel-button" onClick={() => setModalOpen(false)}>
                    Cancelar
                </button>
            </Modal>
            <div>
                <label htmlFor="artistasPerPage">Artistas por página: </label>
                <select
                    name="artistasPerPage"
                    id="artistasPerPage"
                    value={artistasPerPage}
                    onChange={(e) => setArtistasPerPage(Number(e.target.value))}
                >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );

}

export default ListaArtistas;