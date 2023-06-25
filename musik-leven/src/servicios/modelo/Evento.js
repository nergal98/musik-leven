export default class Evento {
  constructor(
    nombre,
    descripcion,
    imagen,
    lugar,
    genero,
    ciudad,
    precio,
    fecha,
    organizador,
    id
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.lugar = lugar;
    this.ciudad = ciudad;
    this.precio = precio;
    this.fecha = fecha;
    this.organizador = organizador;
    this.id = id;
  }

  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get imagen() {
    return this._imagen;
  }

  get lugar() {
    return this._lugar;
  }

  get genero() {
    return this._genero;
  }

  get ciudad() {
    return this._ciudad;
  }

  get precio() {
    return this._precio;
  }

  get fecha() {
    return this._fecha;
  }

  get organizador() {
    return this._organizador;
  }

  get id() {
    return this._id;
  }
}
