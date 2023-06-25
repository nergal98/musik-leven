import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validator from "../../../utilidades/validator/Validator";
import "./ArtistaForm.css";

export default function FormularioArtista() {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = id !== undefined;

    const [state, setState] = React.useState({
        nombre: "",
        apellidos: "",
        bio: "",
        anioNac: "",
        paisOrigen: "",
        albumes: 0,
        foto: ""
    });

    const [errors, setErrors] = React.useState({});

    const handleInputChange = (artista) => {
        setState({
            ...state,
            [artista.target.name]: artista.target.value,
        });
    };

    React.useEffect(() => {
        if (isEdit) {
            const artistas = JSON.parse(localStorage.getItem("artistas")) || [];
            const artista = artistas[id];

            if (artista) {
                setState(artista);
            } else {
                // Manejar el caso en que no se encuentre el artista
            }
        }
    }, [isEdit, id]);


    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        errors.paisOrigen = new Validator(state.paisOrigen)
            .isRequired("Por favor, introduce el pais del artista.")
            .getErrors();

        errors.anioNac = new Validator(state.anioNac)
            .isRequired("Por favor, introduce el año nacimiento del artista.")
            .isDate("Por favor, introduce una fecha válida. Formato: YYYY-MM-DD")
            .getErrors();

        errors.nombre = new Validator(state.nombre)
            .isRequired("Por favor, introduce el nombre del artista.")
            .isLength(
                1,
                100,
                "El nombre del artista no puede exceder de 100 caracteres."
            )
            .getErrors();

        errors.apellidos = new Validator(state.apellidos)
            .isRequired("Por favor, introduce los apellidos del artista.")
            .isLength(
                1,
                100,
                "Los apellidos del artista no puede exceder de 100 caracteres."
            )
            .getErrors();

        errors.bio = new Validator(state.bio)
            .isRequired("Por favor, introduce la bio del artista.")
            .isLength(
                1,
                500,
                "La bio del artista no puede exceder de 500 caracteres."
            )
            .getErrors();

        errors.foto = new Validator(state.foto)
            .isRequired("Por favor, introduce la URL de la foto del artista.")
            .isImageFile("Por favor, introduce una URL válida para la foto.")
            .getErrors();

        errors.albumes = new Validator(state.albumes).isRequired("Por favor, introduzca un número de álbumes").isNumber("Por favor, introduzca dato válido").getErrors();

        setErrors(errors);

        for (let field in errors) {
            if (errors[field]) {
                formIsValid = false;
                break;
            }
        }

        return formIsValid;
    };

    const handleSubmit = (artista) => {
        artista.preventDefault();
        if (validateForm()) {
            const artistas = JSON.parse(localStorage.getItem("artistas")) || [];
            if (isEdit) {
                artistas[id] = state;
            } else {
                artistas.push(state);
            }
            localStorage.setItem("artistas", JSON.stringify(artistas));
            navigate("/privado/artistas-privado"); // Aquí está el cambio
        }
    };

    return (
        <div className="formulario-artista-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre del artista"
                    value={state.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}

                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    placeholder="Apellidos del artista"
                    value={state.apellidos}
                    onChange={handleInputChange}
                />
                {errors.apellidos && <p style={{ color: "red" }}>{errors.apellidos}</p>}

                <label htmlFor="bio">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    placeholder="Bio del artista"
                    value={state.bio}
                    onChange={handleInputChange}
                />
                {errors.bio && (
                    <p style={{ color: "red" }}>{errors.bio}</p>
                )}

                <label htmlFor="anioNac">Año nacimiento</label>
                <input
                    type="date"
                    name="anioNac"
                    id="anioNac"
                    placeholder="Año nacimiento del artista"
                    value={state.anioNac}
                    onChange={handleInputChange}
                />
                {errors.anioNac && <p style={{ color: "red" }}>{errors.anioNac}</p>}

                <label htmlFor="paisOrigen">País origen</label>
                <input
                    type="text"
                    name="paisOrigen"
                    id="paisOrigen"
                    placeholder="País de origen del artista"
                    value={state.paisOrigen}
                    onChange={handleInputChange}
                />
                {errors.paisOrigen && <p style={{ color: "red" }}>{errors.paisOrigen}</p>}


                <label htmlFor="albumes">Álbumes</label>
                <input
                    type="number"
                    step="0.01"
                    name="albumes"
                    id="albumes"
                    placeholder="Álbumes del artista"
                    value={state.albumes}
                    onChange={handleInputChange}
                />
                {errors.albumes && <p style={{ color: "red" }}>{errors.albumes}</p>}


                <label htmlFor="foto">Foto</label>
                <input
                    type="text"
                    name="foto"
                    id="foto"
                    placeholder="URL de la foto del artista"
                    value={state.foto}
                    onChange={handleInputChange}
                />
                {errors.foto && <p style={{ color: "red" }}>{errors.foto}</p>}

                <button type="submit">{isEdit ? "Actualizar" : "Guardar"}</button>
                <button type="button" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </form>
        </div>
    );

}