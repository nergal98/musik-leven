import { faker } from "@faker-js/faker";

let eventos = Array.from({ length: 100 }, (_, i) => i + 1);

eventos = eventos.map((evento) => {
  return {
    id: evento,
    nombre: `${faker.word.words()} Festival`,
    lugar: faker.location.streetAddress(),
    fecha: faker.date.future(),
    descripcion: faker.lorem.sentences(50),
    genero: faker.music.genre(),
    ciudad: faker.address.city(),
    foto: faker.image.urlPicsumPhotos(),
    organizador: faker.person.firstName(),
    precio: faker.commerce.price({ min: 50, max: 200 }),
  };
});

export default eventos;
