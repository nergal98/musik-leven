import { Component } from "react";

export default class Formulario extends Component {

    constructor(props) {

        super(props);

        this.state = { nombre: "", email: "", asunto: "", mensaje: "" }

    }

    handleChange = (e) => {

        const { name, value } = e.target;
        this.setState({ [name]: value })

    }

    handleSubmit = (e) => {

        e.preventDefault();

        const datos = this.state;

        if (datos.nombre != null && datos.nombre !== "" && datos.emial !== null && datos.email !== "" && datos.asunto !== null && datos.asunto !== "" && datos.mensaje !== null && datos.mensaje !== "") { //compruebo que los datos que llegan no son vacíos

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(datos.email)) { //si no son vacíos, compruebo que el usuario no quite el tipo email y meta email incorrecto

                const values = JSON.stringify(this.state);
                console.log(values);
                alert("Su mensaje ha sido enviado al admin");

            } else {

                alert("Formato de email erróneo");

            }


        } else {

            alert("Aún quedan campos por rellenar");

        }


    }

    render() {

        const { nombre, email, asunto, mensaje } = this.state;

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

                        <p>
                            <label>Email:</label>
                        </p>
                        <p>
                            <input type='email' name="email" value={email} onChange={this.handleChange}></input>
                        </p>

                        <p>
                            <label>Asunto:</label>
                        </p>
                        <p>
                            <input type='text' name="asunto" value={asunto} onChange={this.handleChange}></input>
                        </p>

                        <p>
                            <label>Mensaje:</label>
                        </p>
                        <p>
                            <textarea name="mensaje" value={mensaje} onChange={this.handleChange} ></textarea>
                        </p>

                        <p>
                            <input type='submit' value="Enviar" />
                        </p>
                    </form>
                </fieldset>

            </>

        )

    };

}