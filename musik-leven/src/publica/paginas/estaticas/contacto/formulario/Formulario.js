import { Component } from "react";
import Validador from "./validador/Validador";

export default class Formulario extends Component {

    constructor(props) {

        super(props);

        this.state = {
            values: {
                nombre: "", email: "", asunto: "", mensaje: ""
            },
            validations: {
                nombre: [], email: [], asunto: [], mensaje: []
            }
        }

    }

    handleChange = (e) => {

        const { name, value } = e.target;
        this.setState(
            {

                values: {
                    ...this.state.values,
                    [name]: value
                }
            }
        )

    }

    handleSubmit = (e) => {

        e.preventDefault();
        const isValid = this.validateAll();

        if (!isValid) {

            return false;

        }

        alert("Se ha enviado un correo al dmin con tu mensaje");


    }

    validateAll = () => {

        const { nombre, email, asunto, mensaje } = this.state.values;

        const validations = { nombre: "", email: "", asunto: "", mensaje: "" };

        validations.nombre = this.validateNombre(nombre);
        validations.email = this.validateEmail(email);
        validations.asunto = this.validateAsunto(asunto);
        validations.mensaje = this.validateMensaje(mensaje);

        const mensajesValidacion = Object.values(validations).filter(mensaje => mensaje.length);

        const isValid = !mensajesValidacion.length;

        if (!isValid) {

            this.setState({ validations });

        }



        return isValid;

    }

    validateNombre = (name) => {

        const validadorNombre = new Validador(name);

        return validadorNombre
            .isNotEmpty("Nombre requerido")
            .isLength(50, "La longitud de nombre no es correcta (max 50)")
            .result

    }

    validateEmail = (name) => {

        const validadorEmail = new Validador(name);

        return validadorEmail
            .isNotEmpty("Email requerido")
            .isEmail("Formato email incorrecto")
            .result

    }

    validateAsunto = (name) => {

        const validadorAsunto = new Validador(name);

        return validadorAsunto
            .isNotEmpty("Asunto requerido")
            .isLength(50, "La longitud de asunto no es correcta (max 100)")
            .result

    }

    validateMensaje = (name) => {

        const validadorMensaje = new Validador(name);

        return validadorMensaje
            .isNotEmpty("Mensaje requerio")
            .isLength(200, "La longitud de mensaje no es correcta (max 200)")
            .result

    }

    render() {

        const { nombre, email, asunto, mensaje } = this.state;

        const { nombre: nameVal, email: emailVal, asunto: asuntoVal, mensaje: mensajeVal } = this.state.validations

        return (

            <>
                <fieldset>
                    <legend>Envíanos un mensaje</legend>
                    <form onSubmit={this.handleSubmit}>

                        <p>
                            <label>Nombre:</label>
                        </p>
                        <p>
                            <input type='text' name="nombre" value={nombre} onChange={this.handleChange}></input>
                        </p>

                        <div>
                            {nameVal}
                        </div>

                        <p>
                            <label>Email:</label>
                        </p>
                        <p>
                            <input type='email' name="email" value={email} onChange={this.handleChange}></input>
                        </p>

                        <div>
                            {emailVal}
                        </div>

                        <p>
                            <label>Asunto:</label>
                        </p>
                        <p>
                            <input type='text' name="asunto" value={asunto} onChange={this.handleChange}></input>
                        </p>

                        <div>
                            {asuntoVal}
                        </div>

                        <p>
                            <label>Mensaje:</label>
                        </p>
                        <p>
                            <textarea name="mensaje" value={mensaje} onChange={this.handleChange} ></textarea>
                        </p>

                        <div>
                            {mensajeVal}
                        </div>

                        <p>
                            <input type='submit' value="Enviar" />
                        </p>
                    </form>
                </fieldset>

            </>

        )

    };

}