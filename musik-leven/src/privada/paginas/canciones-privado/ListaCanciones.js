import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListaCanciones.css";

import Modal from "../../utilidades/modal/Modal";
import Pagination from "../../utilidades/paginator/Pagination";

const ListaCanciones = () => {

    // Estados
    const [canciones, setCanciones] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancionToDelete, setCancionToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [cancionesPerPage, setCancionesPerPage] = useState(5);

    const maxPageNums = 5;
    const totalPages = Math.ceil(canciones.length / cancionesPerPage);

    // Lógica de paginación
    const indexOfLastEvent = currentPage * cancionesPerPage;
    const indexOfFirstEvent = indexOfLastEvent - cancionesPerPage;
    const currentCanciones = canciones.slice(indexOfFirstEvent, indexOfLastEvent);


    // Carga de canciones
    useEffect(() => {
        const loadCanciones = () => {
            try {
                const canciones = JSON.parse(localStorage.getItem("canciones")) || [];
                setCanciones(canciones);
            } catch (e) {
                console.error("Error parsing canciones from localStorage:", e);
                setCanciones([]);
            }
        };
        loadCanciones();
    }, []);

    useEffect(() => {
        setCurrentPage((oldPage) => {
            const newTotalPages = Math.ceil(canciones.length / cancionesPerPage);
            return Math.min(oldPage, newTotalPages);
        });
    }, [cancionesPerPage]);

    useEffect(() => {
        const newTotalPages = Math.ceil(canciones.length / cancionesPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        } else if (currentPage < 1 && newTotalPages > 0) {
            setCurrentPage(1);
        }
    }, [canciones, cancionesPerPage, currentPage]);

    const handleDelete = (index) => {
        // Calcula el índice correcto en la lista de todas las canciones
        const realIndex = currentPage * cancionesPerPage - cancionesPerPage + index;
        setModalOpen(true);
        setCancionToDelete(realIndex);
    };
    const confirmDelete = () => {
        let cancionesCopy = [...canciones];
        cancionesCopy.splice(cancionToDelete, 1);
        localStorage.setItem("canciones", JSON.stringify(cancionesCopy));
        setCanciones(cancionesCopy);
        setModalOpen(false);
    };

    // Renderizado
    if (canciones.length === 0) {
        return (
            <div className="lista-canciones-container">
                <p>No hay canciones para listar.</p>
                <Link className="crear-nuevo" to={`/privado/canciones-privado/nuevo`}>
                    Crear nueva cancion
                </Link>
            </div>
        );
    }

    return (
        <div className="lista-canciones-container">
            <Link className="crear-nuevo" to={`/privado/canciones-privado/nuevo`}>
                Crear nueva cancion
            </Link>
            <ul>
                {currentCanciones.map((cancion, index) => {
                    // Calcula el índice correcto en la lista de todas las canciones
                    const realIndex = currentPage * cancionesPerPage - cancionesPerPage + index;

                    return (
                        <li key={realIndex}>
                            {realIndex + 1} - {cancion.nombre} - {cancion.artista} - {cancion.fechaSalida}
                            <div className="botones">
                                <button onClick={() => handleDelete(index)}>Eliminar</button>
                                <Link to={`/privado/canciones-privado/editar/${realIndex}`}>
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
                cancionesPerPage={cancionesPerPage}
                setCancionesPerPage={setCancionesPerPage}
                maxPageNums={maxPageNums}
            />
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>Confirmar eliminación</h2>
                <p>¿Estás seguro de que quieres eliminar esta canción?</p>
                <button className="confirm-button" onClick={confirmDelete}>
                    Confirmar
                </button>
                <button className="cancel-button" onClick={() => setModalOpen(false)}>
                    Cancelar
                </button>
            </Modal>
            <div>
                <label htmlFor="cancionesPerPage">Canciones por página: </label>
                <select
                    name="cancionesPerPage"
                    id="cancionesPerPage"
                    value={cancionesPerPage}
                    onChange={(e) => setCancionesPerPage(Number(e.target.value))}
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

export default ListaCanciones;