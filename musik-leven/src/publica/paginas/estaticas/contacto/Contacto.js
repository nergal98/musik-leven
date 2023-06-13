import Map from './mapa/Mapa';
function Contacto() {

    return ( //devuelve el html que forma parte de la página contacto

        <>
            <header id="header-contacto">
                <h2>Pagina de contacto</h2>
            </header>

            <section id="section-contacto">
                <div id="form-contacto">

                </div>
                <div id="mapa-contacto">
                    <Map />
                </div>
            </section>
        </>

    );

}

export default Contacto;