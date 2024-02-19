const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Actor, Director, Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {include: [Actor, Director, Genre]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setActors = catchError(async (req, res) => {
    // desestructuramos para buscar la pelicula
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    // en caso de no haber encontrado la pelicula
    if(!movie) return res.sendStatus(404)

    //seteo los actores en postman y en el controller
    await movie.setActors(req.body)

    //leeo los actores que acabo de setear con el objetivo de poder retornarlos
    const actors = await movie.getActors()
    
    return res.json(actors)

});

const setDirectors = catchError(async (req, res) => {
    //desestructuramos para encontrar la movie
    const { id } = req.params
    const movie = await Movie.findByPk(id)

    // en caso de no haber encontrado la movie
    if(!movie) return res.sendStatus(404)

    // seteo los directores en postman y en el controlador
    await movie.setDirectors(req.body)

    //leo los directores que ya setee en las peliculas
    const directors = await movie.getActors()

    //retorno los directores
    return res.json(directors)
});

const setGenres = catchError(async (req, res) => {
    //desestructuramos para encontrar la movie
    const { id } = req.params
    // instaciamos
    const movie = await Movie.findByPk(id)

    // en caso de que no se encuentre la pelicula
    if(!movie) return res.sendStatus(404)

    // seteo los generos en postman y en el controlador
    await movie.setGenres(req.body)

    // leo los generos que ya setee en las peliculas
    const genres = await movie.getGenres()

    // retorno los generos
    return res.json(genres)


})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActors,
    setDirectors,
    setGenres
}