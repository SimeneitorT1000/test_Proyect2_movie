const request = require('supertest');
const app = require('../app');

const BASE_URL = '/directors';

const mesageTest = [
    "POST '/directors' should return 201, and response.body to be defined and response.body.name = body.name",
    "GET '/directors' should return 200, response.body to be defined and response.body.length = 1",
    "GET '/directors/:id' should return 200, response.body to be defined and response.body.name = body.name",
    "PUT '/directors/:id' should return 200",
    "DELETE '/directors/:id' should return 204"
];

const director = {
    firstName: "Emilio",
    lastName: "Fernández",
    image: "https://www.google.com",
    nationality: "MÉXICO",
    birthday: "1904-07-09"
};

const newDirector  = {
    firstName: "Roberto",
    lastName: "Gavaldón",
    image: "https://www.google.com",
    nationality: "MÉXICO",
    birthday: "1909-05-01"
};

let directorId;

test(`CREATE -> ${mesageTest[0]}`, async () => {
    const response = await request(app).post(BASE_URL).send(director);
    directorId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(director.lastName);
});

test(`GET ALL -> ${mesageTest[1]}`, async () => {
    const response = await request(app).get(BASE_URL);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test(`GET ONE -> ${mesageTest[2]}`, async () => {
    const response = await request(app).get(`${BASE_URL}/${directorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(director.lastName);
});

test(`UPDATE -> ${mesageTest[3]}`, async () => {
    const response = await request(app).put(`${BASE_URL}/${directorId}`).send(newDirector);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(newDirector.lastName);
});

test(`DELETE -> $mesageTest[4}`, async () => {
    const response = await request(app).delete(`${BASE_URL}/${directorId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});