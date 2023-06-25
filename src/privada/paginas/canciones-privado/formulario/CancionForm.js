import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validator from "../../../utilidades/validator/Validator";
import "./CancionForm.css";

export default function FormularioCancion() {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = id !== undefined;

    const [state, setState] = React.useState({
        nombre: "",
        genero: "",
        artista: "",
        duracion: "",
        fechaSalida: "",
        lyrics: ""
    });

    const [errors, setErrors] = React.useState({});

    const handleInputChange = (cancion) => {
        setState({
            ...state,
            [cancion.target.name]: cancion.target.value,
        });
    };

    React.useEffect(() => {
        if (isEdit) {
            const canciones = JSON.parse(localStorage.getItem("canciones")) || [];
            const cancion = canciones[id];

            if (cancion) {
                setState(cancion);
            } else {
                // Manejar el caso en que no se encuentre la cancion
            }
        }
    }, [isEdit, id]);


    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        errors.nombre = new Validator(state.nombre)
        .isRequired("Por favor, introduce el nombre de la canción.")
        .isLength(
            1,
            150,
            "El nombre de la cancion no puede exceder de 150 caracteres."
        )
        .getErrors();

        errors.genero = new Validator(state.genero)
            .isRequired("Por favor, introduce el género de la canción.")
            .getErrors();
        
        errors.artista = new Validator(state.artista)
        .isRequired("Por favor, introduce el nombre del artista.")
        .isLength(
            1,
            200,
            "El nombre del artista no puede exceder de 200 caracteres."
        )
        .getErrors();

        errors.duracion = new Validator(state.duracion)
            .isRequired("Por favor, introduzca la duración de la canción")
            .isNumber("Por favor, introduzca dato válido")
            .getErrors();

        setErrors(errors);

        errors.fechaSalida = new Validator(state.fechaSalida)
            .isRequired("Por favor, introduce la fecha de salida de la canción.")
            .isDate("Por favor, introduce una fecha válida. Formato: YYYY-MM-DD")
            .getErrors();

        errors.lyrics = new Validator(state.lyrics)
            .isRequired("Por favor, introduce las lyrics de la canción.")
            .isLength(
                1,
                1000,
                "Las lyrics de la canción no pueden exceder los 1000 caracteres."
            )
            .getErrors();

        for (let field in errors) {
            if (errors[field]) {
                formIsValid = false;
                break;
            }
        }

        return formIsValid;
    };

    const handleSubmit = (cancion) => {
        cancion.preventDefault();
        if (validateForm()) {
            const canciones = JSON.parse(localStorage.getItem("canciones")) || [];
            if (isEdit) {
                canciones[id] = state;
            } else {
                canciones.push(state);
            }
            localStorage.setItem("canciones", JSON.stringify(canciones));
            navigate("/privado/canciones-privado"); // Aquí está el cambio
        }
    };

    return (
        <div className="formulario-cancion-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre de la cancion"
                    value={state.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}

                <label htmlFor="genero">Género</label>
                <input
                    type="text"
                    name="genero"
                    id="genero"
                    placeholder="Genero de la cancion"
                    value={state.genero}
                    onChange={handleInputChange}
                />
                {errors.genero && <p style={{ color: "red" }}>{errors.genero}</p>}

                <label htmlFor="artista">Artista</label>
                <input
                    type="text"
                    name="artista"
                    id="artista"
                    placeholder="Artista"
                    value={state.artista}
                    onChange={handleInputChange}
                />
                {errors.artista && <p style={{ color: "red" }}>{errors.artista}</p>}

                <label htmlFor="duracion">Duración</label>
                <input
                    type="number"
                    name="duracion"
                    id="duracion"
                    placeholder="Duración de la Canción"
                    value={state.duracion}
                    onChange={handleInputChange}
                />
                {errors.duracion && <p style={{ color: "red" }}>{errors.duracion}</p>}

                <label htmlFor="fechaSalida">Fecha de Salida</label>
                <input
                    type="date"
                    name="fechaSalida"
                    id="fechaSalida"
                    placeholder="Fecha de salida de la canción"
                    value={state.fechaSalida}
                    onChange={handleInputChange}
                />
                {errors.fechaSalida && <p style={{ color: "red" }}>{errors.fechaSalida}</p>}

                <label htmlFor="lyrics">Lyrics</label>
                <textarea
                    name="lyrics"
                    id="lyrics"
                    placeholder="Lyrics de la canción"
                    value={state.lyrics}
                    onChange={handleInputChange}
                />
                {errors.lyrics && (
                    <p style={{ color: "red" }}>{errors.lyrics}</p>
                )}

                <button type="submit">{isEdit ? "Actualizar" : "Guardar"}</button>
                <button type="button" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </form>
        </div>
    );

}