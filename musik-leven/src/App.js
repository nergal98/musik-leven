import React from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from "react-router-dom";
import Contacto from "./publica/paginas/estaticas/contacto/Contacto";
import Home from "./publica/paginas/estaticas/home/Home";
import SobreNosotros from "./publica/paginas/estaticas/sobre-nosotros/SobreNosotros";
import NotFound from "./publica/paginas/estaticas/not-found/NotFound";
import Cabecera from "./layout/cabecera/Cabecera";
import Footer from "./layout/footer/Footer";
import Eventos from "./publica/paginas/dinamicas/eventos/eventos";
import Evento from "./publica/paginas/dinamicas/eventos/evento/evento";
import Artistas from "./publica/paginas/dinamicas/artistas/artistas";
import Artista from "./publica/paginas/dinamicas/artistas/artista/artista";
import "./App.css";
import CabeceraPrivada from "./layout-privado/cabecera-privada/CabeceraPrivada";
import CancionesList from "./publica/paginas/dinamicas/canciones/canciones";
import CancionItem from "./publica/paginas/dinamicas/canciones/cancion/cancion";
import PrivateRoutes from "./privada/PrivateRoutes";
import Login from "./publica/paginas/estaticas/login/Login";
import SignUp from "./publica/paginas/estaticas/sign-up/SignUp";

function MainContent() {
  const location = useLocation();
  let cabecera;

  if (location.pathname.startsWith("/privado")) {
    cabecera = <CabeceraPrivada />;
  } else {
    cabecera = <Cabecera />;
  }

  let routes = useRoutes([
    {
      path: "/",
      children: [
        { path: "", element: <Home /> },
        { path: "canciones", element: <CancionesList /> },
        { path: "canciones/:id", element: <CancionItem /> },
        { path: "artistas", element: <Artistas /> },
        { path: "artistas/:id", element: <Artista /> },
        { path: "eventos", element: <Eventos /> },
        { path: "eventos/:id", element: <Evento /> },
        { path: "contacto", element: <Contacto /> },
        { path: "sobre-nosotros", element: <SobreNosotros /> },
        { path: "*", element: <NotFound /> },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "privado/*",
      element: <PrivateRoutes />,
    },
  ]);

  return (
    <div className="App">
      {cabecera}
      {routes}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
