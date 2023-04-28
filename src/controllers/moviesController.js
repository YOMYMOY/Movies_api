const db = require('../database/models');
const { getAllMovies, getOneMovie, createMovie, getNewestMovies, getRecommendedMovies, updateMovie, destroyMovie, restoreMovie } = require('../services/moviesServices');
const createResponseError = require('../helpers/createResponseError');
const { validationResult } = require('express-validator');

module.exports = {
    list: async (req, res) => {

        try {

            const movies = await getAllMovies();

            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : movies.length,
                    url : '/api/v1/movies'
                },
                data : movies
            })

        } catch (error) {
            return createResponseError(res,error);
        }

    },
    detail: async (req, res) => {

        try {

            const {
                params : {id}
            } = req;

            const movie = await getOneMovie(id);

            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : 1,
                    url : `/api/v1/movies/${id}`
                },
                data : movie
            })

        } catch (error) {
            return createResponseError(res,error);
        }

    },
    newest: async (req, res) => {

        try {

            const newestMovies = await getNewestMovies();

            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : newestMovies.length,
                    url : `/api/v1/movies/newest`
                },
                data : newestMovies
            })

        } catch (error) {
            return createResponseError(res,error);
        }

    },
    recommended: async (req, res) => {

        try {

            const recommendedMovies = await getRecommendedMovies();

            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : recommendedMovies.length,
                    url : `/api/v1/movies/recomended`
                },
                data : recommendedMovies
            })

        } catch (error) {
            return createResponseError(res,error);
        }

    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    store: async (req,res) => {
       
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) throw {
                status : 400,
                message : errors.mapped()
            }
            const newMovie = await createMovie(req.body);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/movies/${newMovie.id}`
                },
                data: newMovie
            });
        } catch (error) {
            return createResponseError(res,error);
        }
    },
    update: async (req,res) => {

        try {
            
            const {
                params : {id}
            } = req;

            const updatedMovie = await updateMovie(id, req.body);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/movies/${updatedMovie.id}`
                },
                data: updatedMovie
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    },
    destroy: async (req,res) => {
        
        try {
            
            const {
                params : {id}
            } = req;

            const destroyedMovie = await destroyMovie(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/movies/${id}`
                },
                data: destroyedMovie
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    },
    restore: async (req,res) => {

        try {
            
            const {
                params : {id}
            } = req;

            const restoredMovie = await restoreMovie(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/movies/${id}`
                },
                data: restoredMovie
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    }
}