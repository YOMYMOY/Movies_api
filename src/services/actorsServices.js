const db = require('../database/models');

module.exports = {
    getAllActors: async () => {
        try {
            const actors = await db.Actor.findAll();
            return actors;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        } 
    },
    getOneActor: async (id) => {
        try {
            const actor = await db.Actor.findByPk(id);
            return actor;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    createActor: async (data) => {
        try {
            const newActor = await db.Actor.create({
                ...data
            });
            return newActor;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    updateActor : async (id, data) => {
        try {
            const updatedActor = await db.Actor.update(
                {
                    ...data
                },
                {
                    where: {id},
                    returning : true
                }
            );
            return updatedActor[1][0];
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    destroyActor : async (id) => {
        try {
            const destroyedActor = await db.Actor.destroy({
                where : {id}
            });
            return destroyedActor;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getMoviesByActor : async (id) => {
        try {
            const actor = await db.Actor.findByPk(id, {
                include : ['movies']
            });
            return actor;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    }
}