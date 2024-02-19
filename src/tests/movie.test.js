require('../models');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');

const request = require('supertest');
const app = require('../app');

const BASE_URL = '/movies';

const mesageTest = [
    "POST '/movies' should return 201, and response.body to be defined and response.body.name = body.name",
    "GET '/movies' should return 200, response.body to be defined and response.body.length = 1",
    "GET '/movies/:id' should return 200, response.body to be defined and response.body.name = body.name",
    "PUT '/movies/:id' should return 200",
    "DELETE '/movies/:id' should return 204",
    "POST '/movies/:id/actors', should return status code 200, to be defined and movieActor.id = currentActor.id",
    "POST '/movies/:id/directors', should return status code 200, to be defined and movieDirector.id = currentDirector.id",
    "POST '/movies/:id/genres', should return status code 200, to be defined and movieGenre.id = currentGenre.id"
];

const movie = {
    name: "Star Wars",
    image: "hhttps://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/250px-Star_Wars_Logo.svg.png",
    synopsis: "La trama descrita componen la serie principal de Star Wars relata las vivencias de la familia Skywalker,",
    releaseYear: 1977
};

const newMovie  = {
    name: "La guerra de las galaxias",
    image: "hhttps://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/250px-Star_Wars_Logo.svg.png",
    synopsis: "La trama descrita componen la serie principal de Star Wars relata las vivencias de la familia Skywalker,",
    releaseYear: 1977
};

let movieId;
let currentActor;
let currentDirector;
let currentGenre;

beforeAll(async () => {
    const director = {
        firstName: "Emilio",
        lastName: "Fernández",
        image: "https://www.google.com",
        nationality: "MÉXICO",
        birthday: "1904-07-09"
    };

    const actor = {
        firstName: "Tom",
        lastName: "Hanks",
        image: "https://www.google.com",
        nationality: "USA",
        birthday: "1956-07-09"
    };

    const genre = { 
        name: "Sci-Fi" 
    };

    const responseDirector = await request(app)
                .post('/directors')
                .send(director);
    currentDirector = responseDirector.body;

    const responseGenre = await request(app)
                .post('/genres')
                .send(genre);
    currentGenre = responseGenre.body;

    const responseActor = await request(app)
                .post('/actors')
                .send(actor);
    currentActor = responseActor.body;
});

afterAll(async () => {
    await Director.destroy({ where: { id: currentDirector.id } });
    await Genre.destroy({ where: { id: currentGenre.id } });
    await Actor.destroy({ where: { id: currentActor.id } });
});

test(`CREATE -> ${mesageTest[0]}`, async () => {
    const response = await request(app).post(BASE_URL)
                            .send(movie);
    movieId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(movie.lastName);
});

test(`GET ALL -> ${mesageTest[1]}`, async () => {
    const response = await request(app).get(BASE_URL);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test(`GET ONE -> ${mesageTest[2]}`, async () => {
    const response = await request(app).get(`${BASE_URL}/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(movie.name);
});

test(`UPDATE -> ${mesageTest[3]}`, async () => {
    const response = await request(app).put(`${BASE_URL}/${movieId}`)
                            .send(newMovie);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newMovie.name);
});

test(`SET ACTORS -> ${mesageTest[0]}`, async () => {
    const response = await request(app).post(`${BASE_URL}/${movieId}/actors`)
                            .send([currentActor.id])
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveLength(1)
    expect(response.body.length).toBe(1)
    await response.destroy()
    
});  

test(`SET DIRECTORS -> ${mesageTest[0]}`, async () => {
    const response = await request(app)
                            .post(`${BASE_URL}/${movieId}/directors`)
                            .send([currentDirector.id])
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveLength(1)
    expect(response.body.length).toBe(1)
    await response.destroy()
});  

test(`SET GENRES -> ${mesageTest[0]}`, async () => {
    const response = await request(app)
                            .post(`${BASE_URL}/${movieId}/genres`)
                            .send([currentGenre.id])
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveLength(1)
    expect(response.body.length).toBe(1)
    await response.destroy()
    
});
  
test(`DELETE -> ${mesageTest[4]}`, async () => {
    const response = await request(app).delete(`${BASE_URL}/${movieId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});