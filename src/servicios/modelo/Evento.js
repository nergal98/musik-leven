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
    this.genero = genero;
    this.ciudad = ciudad;
    this.precio = precio;
    this.fecha = fecha;
    this.organizador = organizador;
    this.id = id;
  }
}