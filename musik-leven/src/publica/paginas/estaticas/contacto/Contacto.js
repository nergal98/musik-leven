import Map from './mapa/Mapa';
function Contacto() {

    return ( //devuelve el html que forma parte de la página contacto

        <>
            <main>

                <h2>Página contacto</h2>

                <section id="section-contacto">
                    <div id="form-contacto">

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