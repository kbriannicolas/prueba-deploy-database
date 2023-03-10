const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const { promiseImpl } = require('ejs');



//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', { movies });
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll()
            .then(allGenres => {
                res.render('moviesAdd', { allGenres })
            })
    },
    create: function (req, res) {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Movie.create({
                id: null,
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }).then(() => {
                res.redirect('/movies')
            })
        } else {
            db.Genre.findAll()
                .then(allGenres => {
                    res.render('moviesAdd', { errors: errors.mapped(), old: req.body, allGenres: allGenres });
                })

        }

    },
    edit: function (req, res) {
        let peliculas = db.Movie.findByPk(req.params.id)
        let generos = db.Genre.findAll()

        Promise.all([peliculas, generos])
            .then(([Movie, allGenres]) => {
                res.render('moviesEdit', { Movie: Movie, allGenres: allGenres })
            })


    },
    update: function (req, res) {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }, {
                where: { id: req.params.id }
            }).then(() => {
                res.redirect('/movies')
            })
        } else {
            let peliculas = db.Movie.findByPk(req.params.id)
            let generos = db.Genre.findAll()

            Promise.all([peliculas, generos])
                .then(([Movie, allGenres]) => {
                    res.render('moviesEdit', { errors: errors.mapped(), old: req.body, Movie: Movie, allGenres: allGenres });
                })

        }

    },
    delete: function (req, res) {
        db.Movie.destroy({
            where: { id: req.params.id }
        }).then(() => {
            res.redirect('/movies');
        })
    },
    restore:function (req, res) {
       db.Movie.restore({ where: {softdelete:{[Op.not]: null}}})
       .then(() => {
          res.redirect('/movies');
       })
    },
    destroy: function (req, res) {
     db.Movie.destroy({ where: {id: req.params.id},force:true})
     .then(() => {                                 //el force:true se utiliza para borrar sin persistencia 
                                                   //ya que indique que el paranoid es true
        res.redirect('/movies');
     })
    }
}

module.exports = moviesController;