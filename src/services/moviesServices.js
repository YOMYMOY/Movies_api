const db = require('../database/models');

module.exports = {
    getAllMovies : async () => {
        try {
            const movies = await db.Movie.findAll({
                include: ['genre']
            });
            return movies;

        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getOneMovie : async (id) => {
        try {
            const movie = await db.Movie.findByPk(id, {
                include : ['genre']
            });
            return movie;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getNewestMovies : async () => {
        try {
            const newestMovies = await db.Movie.findAll({
                order : [
                    ['release_date', 'DESC']
                ],
                limit: 5
            });
            return newestMovies;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getRecommendedMovies : async () =>{
        try {
            const recommendedMovies = await db.Movie.findAll({
                include: ['genre'],
                where: {
                    rating: {[db.Sequelize.Op.gte] : 8}
                },
                order: [
                    ['rating', 'DESC']
                ]
            });
            return recommendedMovies;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    createMovie : async (data) => {
        try {
            const newMovie = await db.Movie.create({
                title: data.title,
                rating: data.rating,
                awards: data.awards,
                release_date: data.release_date,
                length: data.length,
                genre_id: data.genre_id
            });
            return newMovie;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    updateMovie : async (id, data) => {
        try {
            const updatedMovie = await db.Movie.update(
                {
                    title: data.title,
                    rating: data.rating,
                    awards: data.awards,
                    release_date: data.release_date,
                    length: data.length,
                    genre_id: data.genre_id
                },
                {
                    where: {id : id}
                }
            );
            return updatedMovie;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    destroyMovie : async (id) => {
        try {
            const destroyedMovie = await db.Movie.destroy({
                where : {id}
            });
            return destroyedMovie;
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    restoreMovie : async (id) => {
        try {
            const restoredMovie = await db.Movie.restore({
                where : {id}
            });
            return restoredMovie;
        } catch (error) {
                throw {
                    status : 500,
                    message : error.message
                }
        }
    },
    searchMovie : async (keyword) => {
        try {
            const foundMovie = await db.Movie.findOne({
                where : {
                    title : {
                        [db.Sequelize.Op.like] : `%${keyword}%`
                    }
                }
            });
            const url = "http://www.omdbapi.com/";
            const apikey = "1b42686d";
            if(foundMovie === null){
                const response = await fetch(`${url}?apiKey=${apikey}&t=${keyword}`);
                const result = await response.json();
                /* const genres = await result.Genre.split(", ");
                const genre = await genres[0];
                const foundGenre = await db.Genre.findOne({
                    where : {
                        name : genre
                    }
                }) */
                /* const data = await {
                    title: result.Title,
                    rating: result.imdbRating,
                    awards: result.Awards,
                    release_date: result.Released,
                    length: result.Runtime
                    genre_id: foundGenre?.id || null
                }
                const newMovie = await this.createMovie(data); */
                return result;
            } else {
                return {
                    Title: foundMovie.title,
                    Year: foundMovie.release_date.getFullYear(),
                    imdbRating: foundMovie.rating,
                    Awards: foundMovie.awards,
                    Runtime: foundMovie.length
                };
            }
            
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    }
}