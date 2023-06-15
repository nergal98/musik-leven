import { faker } from "@faker-js/faker";

let canciones = Array.from({ length: 100 }, (_, i) => i + 1);

canciones = canciones.map((cancion) => {
    return {
      id: cancion,
      nombre: faker.music.songName(),
      genero: faker.music.genre(),
      artista: faker.person.firstName(),
      duracion: faker.datatype.number({ min: 120, max: 450 }),
      fechasalida: faker.date.past(),
      lyrics: faker.lorem.paragraphs(5),
    };
});
  
  export default canciones;
  