import { faker } from "@faker-js/faker";

let artistas = Array.from({ length: 100 }, (_, i) => i + 1);

artistas = artistas.map((artista) => {
    return {
        id: artista,
        nombre: faker.person.firstName,
        apellidos: faker.person.lastName,
        bio: faker.person.bio,
        anioNac: faker.date.birthdate({ min: 16, max: 85, mode: 'age' }),
        albumes: faker.number.binary({ min: 0, max: 500 }),
        foto: faker.image.urlLoremFlickr({ category: 'people' })
    };
});

export default artistas;