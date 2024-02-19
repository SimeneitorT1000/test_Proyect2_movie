const request = require('supertest');
const app = require('../app');

const BASE_URL = '/genres';

const mesageTest = [
    "POST '/genres' should return 201, and response.body to be defined and response.body.name = body.name",
    "GET '/genres' should return 200, response.body to be defined and response.body.length = 1",
    "GET '/genres/:id' should return 200, response.body to be defined and response.body.name = body.name",
    "PUT '/genres/:id' should return 200",
    "DELETE '/genres/:id' should return 204"
];

const genreName = "Thiller";
const newGenreName = "Action"

let genreId = null;

test(`CREATE -> ${mesageTest[0]}`, async () => {
    const body = { name: genreName};
    const response = await request(app).post(BASE_URL).send(body);
    genreId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(body.name);
});

test(`GET ALL -> ${mesageTest[1]}`, async () => {
    const response = await request(app).get(BASE_URL);
    expect(response.status).toBe(200);    
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test(`GET ONE -> ${mesageTest[2]}`, async () => {
    const response = await request(app).get(`${BASE_URL}/${genreId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(genreName);
});

test(`UPDATE -> ${mesageTest[3]}`, async () => {
    const response = await request(app).put(`${BASE_URL}/${genreId}`).send({ name: newGenreName });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(newGenreName);
});

test(`DELETE -> ${mesageTest[4]}`, async () => {
    const response = await request(app).delete(`${BASE_URL}/${genreId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});