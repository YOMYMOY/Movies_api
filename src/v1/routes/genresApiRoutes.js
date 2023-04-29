const router = require('express').Router();
const {list, detail, store, update, destroy, genreMovies} = require('../../controllers/api/genresController');
const genresValidator = require('../../validations/genresValidator');


/* /api/v1/genres */
router
    .get('/', list)
    .get('/:id', detail)
    .post('/', genresValidator, store)
    .put('/:id', update)
    .delete('/:id', destroy)
    .get('/:id/movies', genreMovies)


module.exports = router;