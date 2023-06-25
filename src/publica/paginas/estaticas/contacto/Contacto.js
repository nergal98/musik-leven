import Formulario from './formulario/Formulario';
import Map from './mapa/Mapa';
import './Contacto.css';
function Contacto() {

    return ( //devuelve el html que forma parte de la página contacto

        <>
            <main>

                <h2>Página contacto</h2>

                <section id="section-contacto">
                    <div id="form-contacto">
                        <Formulario />
                    </div>
                    <div id="mapa-contacto">
                        <Map />
                    </div>
                </section>

            </main>
        </>

    );

}

export default Contacto;