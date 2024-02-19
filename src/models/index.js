const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

/* 
    1- TABLA PIVOT DE (moviesActors)
    2- RELACION (*, *)

*/
//  Una pelicula puede tener muchos actores
Movie.belongsToMany(Actor, {through: 'moviesActors'})
//  Un actor puede estar en muchas peliculas
Actor.belongsToMany(Movie, {through: 'moviesActors'})

/* 
    1- TABLA PIVOT DE (moviesdirectors)
    2- RELACION (*, *)

*/
// Una pelicula puede tener muchos directores.
Movie.belongsToMany(Director, {through: 'moviesDirectors'})
// Una director puede dirigir muchas peliculas.
Director.belongsToMany(Movie, {through: 'moviesDirectors'})

/* 
    1- TABLA PIVOT DE (moviesGenres)
    2- RELACION (*, *)

*/
// Una pelicula puede tener muchos generos. 
Movie.belongsToMany(Genre, {through: 'moviesGenres'})
// genero puede tener muchas peliculas.
Genre.belongsToMany(Movie, {through: 'moviesGenres'})




