import React from 'react';
import { useRoutes } from 'react-router-dom';
import FormularioEvento from "./paginas/eventos-privado/formulario/EventForm";
import ListaEventos from "./paginas/eventos-privado/ListaEventos";
import Home from '../publica/paginas/estaticas/home/Home';
import ListaArtistas from './paginas/artistas-privado/ListaArtistas';
import FormularioArtista from './paginas/artistas-privado/formulario/ArtistaForm';
import ListaCanciones from './paginas/canciones-privado/ListaCanciones';
import FormularioCancion from './paginas/canciones-privado/formulario/CancionForm';

export default function PrivateRoutes() {
    let routes = useRoutes([
        { path: "", element: <Home /> },
        { path: "eventos-privado", element: <ListaEventos /> },
        { path: "eventos-privado/nuevo", element: <FormularioEvento /> },
        { path: "eventos-privado/editar/:id", element: <FormularioEvento /> },
        { path: "artistas-privado", element: <ListaArtistas /> },
        { path: "artistas-privado/nuevo", element: <FormularioArtista /> },
        { path: "artistas-privado/editar/:id", element: <FormularioArtista /> },
        { path: "canciones-privado", element: <ListaCanciones /> },
        { path: "canciones-privado/nuevo", element: <FormularioCancion /> },
        { path: "canciones-privado/editar/:id", element: <FormularioCancion /> }
    ]);

    return routes;
}