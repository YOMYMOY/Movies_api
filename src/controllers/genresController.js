const { validationResult } = require('express-validator');
const createResponseError = require('../helpers/createResponseError');
const { getAllGenres, getOneGenre, createGenre, destroyGenre, updateGenre, getMoviesByGenre } = require('../services/genresServices');

module.exports = {
    list: async (req, res) => {

        try {

            const genres = await getAllGenres();

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    //total : genres.length,
                    url: '/api/v1/genres'
                },
                data: genres
            })
        } catch (error) {
            return createResponseError(res, error);
        }

    },
    detail: async (req, res) => {

        try {

            const {
                params: {
                    id
                }
            } = req;

            const genre = await getOneGenre(id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/genres/${id}`
                },
                data: genre
            })

        } catch (error) {
            return createResponseError(res, error);
        }

    },
    store: async (req, res) => {

        try {

            const errors = validationResult(req);

            if(!errors.isEmpty()) throw {
                status : 400,
                message : errors.mapped()
            }

            const newGenre = await createGenre(req.body);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${newGenre.id}`
                },
                data: newGenre
            });

        } catch (error) {
            return createResponseError(res, error);
        }

    },
    update: async (req, res) => {

        try {
            
            const {
                params : {id}
            } = req;

            const updatedGenre = await updateGenre(id, req.body);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/genres/${updatedGenre.id}`
                },
                data: updatedGenre
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    },
    destroy: async (req, res) => {
 
        try {
            
            const {
                params : {id}
            } = req;

            const destroyedGenre = await destroyGenre(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/genres/${id}`
                },
                data: destroyedGenre
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    },
    genreMovies : async (req,res) => {
        try {
            const {
                params : {id}
            } = req;

            const moviesByGenre = await getMoviesByGenre(id);
            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : moviesByGenre.movies.length,
                    url : `/api/v1/genres/${id}/movies`
                },
                data : moviesByGenre
            });
        } catch (error) {
            return createResponseError(res,error);
        }
    }
}