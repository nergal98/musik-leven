import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validator from "../../../utilidades/validator/Validator";
import "./EventForm.css";

function FormularioEvento() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id !== undefined;

  const [state, setState] = React.useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    lugar: "",
    genero: "",
    ciudad: "",
    precio: "",
    fecha: "",
    organizador: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    if (isEdit) {
      const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
      const evento = eventos[id];

      if (evento) {
        setState(evento);
      } else {
        // Manejar el caso en que no se encuentre el evento
      }
    }
  }, [isEdit, id]);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    errors.lugar = new Validator(state.lugar)
      .isRequired("Por favor, introduce el lugar del evento.")
      .isLength(
        1,
        100,
        "El nombre del lugar no puede exceder de 100 caracteres."
      )
      .getErrors();

    errors.genero = new Validator(state.genero)
      .isRequired("Por favor, introduce el género del evento.")
      .getErrors();

    errors.ciudad = new Validator(state.ciudad)
      .isRequired("Por favor, introduce la ciudad del evento.")
      .getErrors();

    errors.precio = new Validator(state.precio)
      .isRequired("Por favor, introduce el precio del evento.")
      .isNumber("Por favor, introduce un precio válido.")
      .hasMaxTwoDecimals("El precio no puede tener más de dos decimales.")
      .getErrors();

    errors.fecha = new Validator(state.fecha)
      .isRequired("Por favor, introduce la fecha del evento.")
      .isDate("Por favor, introduce una fecha válida. Formato: YYYY-MM-DD")
      .getErrors();

    errors.organizador = new Validator(state.organizador)
      .isRequired("Por favor, introduce el organizador del evento.")
      .getErrors();

    errors.nombre = new Validator(state.nombre)
      .isRequired("Por favor, introduce el nombre del evento.")
      .isLength(
        1,
        100,
        "El nombre del evento no puede exceder de 100 caracteres."
      )
      .getErrors();

    errors.descripcion = new Validator(state.descripcion)
      .isRequired("Por favor, introduce la descripción del evento.")
      .isLength(
        1,
        500,
        "La descripción del evento no puede exceder de 500 caracteres."
      )
      .getErrors();

    errors.imagen = new Validator(state.imagen)
      .isRequired("Por favor, introduce la URL de la imagen del evento.")
      .isImageFile("Por favor, introduce una URL válida para la imagen.")
      .getErrors();

    setErrors(errors);

    for (let field in errors) {
      if (errors[field]) {
        formIsValid = false;
        break;
      }
    }

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
      if (isEdit) {
        eventos[id] = state;
      } else {
        eventos.push(state);
      }
      localStorage.setItem("eventos", JSON.stringify(eventos));
      navigate("/privado/eventos-privado"); // Aquí está el cambio
    }
  };
  return (
    <div className="formulario-evento-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre del evento"
          value={state.nombre}
          onChange={handleInputChange}
        />
        {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          name="descripcion"
          id="descripcion"
          placeholder="Descripción del evento"
          value={state.descripcion}
          onChange={handleInputChange}
        />
        {errors.descripcion && (
          <p style={{ color: "red" }}>{errors.descripcion}</p>
        )}

        <label htmlFor="lugar">Lugar</label>
        <input
          type="text"
          name="lugar"
          id="lugar"
          placeholder="Lugar del evento"
          value={state.lugar}
          onChange={handleInputChange}
        />
        {errors.lugar && <p style={{ color: "red" }}>{errors.lugar}</p>}
        <label htmlFor="genero">Género</label>
        <input
          type="text"
          name="genero"
          id="genero"
          placeholder="Género del evento"
          value={state.genero}
          onChange={handleInputChange}
        />
        {errors.genero && <p style={{ color: "red" }}>{errors.genero}</p>}
        <label htmlFor="ciudad">Ciudad</label>
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          placeholder="Ciudad del evento"
          value={state.ciudad}
          onChange={handleInputChange}
        />
        {errors.ciudad && <p style={{ color: "red" }}>{errors.ciudad}</p>}
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          id="precio"
          placeholder="Precio del evento"
          value={state.precio}
          onChange={handleInputChange}
        />
        {errors.precio && <p style={{ color: "red" }}>{errors.precio}</p>}
        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          name="fecha"
          id="fecha"
          placeholder="Fecha del evento"
          value={state.fecha}
          onChange={handleInputChange}
        />
        {errors.fecha && <p style={{ color: "red" }}>{errors.fecha}</p>}

        <label htmlFor="organizador">Organizador</label>
        <input
          type="text"
          name="organizador"
          id="organizador"
          placeholder="Organizador del evento"
          value={state.organizador}
          onChange={handleInputChange}
        />
        {errors.organizador && (
          <p style={{ color: "red" }}>{errors.organizador}</p>
        )}

        <label htmlFor="imagen">Imagen</label>
        <input
          type="text"
          name="imagen"
          id="imagen"
          placeholder="URL de la imagen del evento"
          value={state.imagen}
          onChange={handleInputChange}
        />
        {errors.imagen && <p style={{ color: "red" }}>{errors.imagen}</p>}

        <button type="submit">{isEdit ? "Actualizar" : "Guardar"}</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioEvento;
