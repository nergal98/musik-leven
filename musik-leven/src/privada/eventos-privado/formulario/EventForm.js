import React, { useState } from "react";
import "./EventForm.css";

function EventForm() {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    lugar: "",
    fecha: "",
    descripcion: "",
    genero: "",
    ciudad: "",
    foto: "",
    organizador: "",
    precio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field in form) {
      if (!form[field]) {
        alert(`Por favor, rellena el campo de ${field}`);
        return;
      }
    }

    if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.organizador)
    ) {
      alert("Por favor, introduce un organizador válido.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(form.precio)) {
      alert("Por favor, introduce un precio válido. Máximo dos decimales.");
      return;
    }

    if (!/\d{4}-\d{2}-\d{2}/.test(form.fecha)) {
      alert("Por favor, introduce una fecha válida (YYYY-MM-DD).");
      return;
    }

    if (
      !/^https?:\/\/[\w.\-]+(\.[\w\-]+)+[/\w\-._~:/?#[\]@!$&'()*+,;=]*$/.test(
        form.foto
      )
    ) {
      alert("Por favor, introduce una URL válida para la foto.");
      return;
    }

    localStorage.setItem(`event_${form.id}`, JSON.stringify(form));
    alert("Evento registrado con éxito!");
    setForm({
      id: "",
      nombre: "",
      lugar: "",
      fecha: "",
      descripcion: "",
      genero: "",
      ciudad: "",
      foto: "",
      organizador: "",
      precio: "",
    });
  };

  return (
    <div className="eventForm">
      <h1>Registrar Evento</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID del Evento"
        />
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del Evento"
        />
        <input
          type="text"
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          placeholder="Lugar del Evento"
        />
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          placeholder="Fecha del Evento"
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción del Evento"
        />
        <input
          type="text"
          name="genero"
          value={form.genero}
          onChange={handleChange}
          placeholder="Género del Evento"
        />
        <input
          type="text"
          name="ciudad"
          value={form.ciudad}
          onChange={handleChange}
          placeholder="Ciudad del Evento"
        />
        <input
          type="text"
          name="foto"
          value={form.foto}
          onChange={handleChange}
          placeholder="URL de la Foto del Evento"
        />
        <input
          type="text"
          name="organizador"
          value={form.organizador}
          onChange={handleChange}
          placeholder="Email del Organizador del Evento"
        />
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio del Evento"
          step="0.01"
          min="0"
        />
        <button type="submit">Registrar Evento</button>
      </form>
    </div>
  );
}

export default EventForm;
