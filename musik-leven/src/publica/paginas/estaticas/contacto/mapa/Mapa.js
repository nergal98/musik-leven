import { Component } from "react";

class Mapa extends Component {

    constructor(props) {

        super(props);

        this.state = { lat: -34.397, lng: 150.644 } //latitud y longitud por defecto

    }

    onScriptLoad() { //cuando carga el script, se añade el mapa al div del return que tiene como id map

        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: this.state.lat, lng: this.state.lng },
            zoom: 8
        });

    }

    componentDidMount() { //si el componente se ha montado
        if (!window.google) { //si no se ha cargado el script que contiene la api google maps

            var s = document.createElement('script'); //se crea un elemento script
            s.type = "text/javascript"; //tipo js
            s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAo2spkHbD-wfnjw2cqvAaBo07Iq0dQ1e0&callback=initMap&v=weekly&channel=2"; //con src a la api de google maps
            var x = document.getElementsByTagName("script")[0];
            x.parentNode.insertBefore(s, x); //se inserta en el dom
            s.addEventListener("load", e => { //y se hace la llamada a la funcion anterior
                this.onScriptLoad();
            });

        } else { //si se ha cargado, llama directamente

            this.onScriptLoad();

        }

    }

    render() {
        const mapStyle = { width: 500, height: 500 };
        return (
            <div style={mapStyle} id="map" /> //devuelve el div con el mapa
        );
    }

}

export default Mapa