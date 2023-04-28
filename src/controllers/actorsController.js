const createResponseError = require('../helpers/createResponseError');
const { getAllActors, getOneActor, createActor, updateActor, destroyActor, getMoviesByActor } = require('../services/actorsServices');
const { validationResult } = require('express-validator');

module.exports = {
    list: async (req, res) => {

        try {
            const actors = await getAllActors();
            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : actors.length,
                    url : '/api/v1/actors'
                },
                data : actors
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

            const actor = await getOneActor(id);

            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : 1,
                    url : `/api/v1/actors/${id}`
                },
                data : actor
            });
            
        } catch (error) {
            return createResponseError(res,error);
        }
        
    },
    store : async (req,res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) throw {
                status : 400,
                message : errors.mapped()
            }
            const newActor = await createActor(req.body);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/actors/${newActor.id}`
                },
                data: newActor
            });
        } catch (error) {
            return createResponseError(res,error);
        }
    },
    update : async (req,res) => {
        try {
            const {
                params : {id}
            } = req;

            const updatedActor = await updateActor(id, req.body);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/v1/actors/${id}`
                },
                data : updatedActor,
            });
        } catch (error) {
            return createResponseError(res,error);
        }
    },
    destroy : async (req,res) => {
        try {
            const {
                params : {id}
            } = req;

            const destroyedActor = await destroyActor(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message : "Eliminado con éxito."
                },
                data: destroyedActor
            });
        } catch (error) {
            return createResponseError(res,error);
        }
    },
    actorMovies : async (req,res) => {
        try {
            const {
                params : {id}
            } = req;

            const moviesByActor = await getMoviesByActor(id);
            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    total : moviesByActor.movies.length,
                    url : `/api/v1/actors/${id}/movies`
                },
                data : moviesByActor
            })
        } catch (error) {
            return createResponseError(res,error);
        }
    }
}