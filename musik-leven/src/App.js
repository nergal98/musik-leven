import logo from './logo.svg';
import './App.css';
import Contacto from './publica/paginas/estaticas/contacto/Contacto';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Route path="/contacto" element={<Contacto />}></Route>
      </Router>

    </>
  );
}

export default App;
