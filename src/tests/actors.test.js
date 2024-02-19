const request = require('supertest');
const app = require('../app');

const BASE_URL = '/actors';

const mesageTest = [
    "POST '/actors' should return 201, and response.body to be defined and response.body.name = body.name",
    "GET '/actors' should return 200, response.body to be defined and response.body.length = 1",
    "GET '/actors/:id' should return 200, response.body to be defined and response.body.name = body.name",
    "PUT '/actors/:id' should return 200",
    "DELETE '/actors/:id' should return 204"
];

const actor = {
    firstName: "Tom",
    lastName: "Hanks",
    image: "https://www.google.com",
    nationality: "USA",
    birthday: "1956-07-09"
};

const newActor  = {
    firstName: "Tom",
    lastName: "Cruise",
    image: "https://www.google.com",
    nationality: "USA",
    birthday: "1965-05-01"
};

let actorId;

test(`CREATE -> ${mesageTest[0]}`, async () => {
    const response = await request(app).post(BASE_URL).send(actor);
    actorId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(actor.lastName);
});

test(`GET ALL -> ${mesageTest[1]}`, async () => {
    const response = await request(app).get(BASE_URL);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);
});

test(`GET ONE -> ${mesageTest[2]}`, async () => {
    const response = await request(app).get(`${BASE_URL}/${actorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(actor.lastName);
});

test(`UPDATE -> ${mesageTest[3]}`, async () => {
    const response = await request(app).put(`${BASE_URL}/${actorId}`).send(newActor);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.lastName).toBe(newActor.lastName);
});

test(`DELETE -> $mesageTest[4}`, async () => {
    const response = await request(app).delete(`${BASE_URL}/${actorId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});