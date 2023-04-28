const router = require('express').Router();
const { list, newest, recommended, detail, store, update, destroy, restore } = require('../../controllers/moviesController');
const moviesValidator = require('../../validations/moviesValidator');


/* /api/v1/movies */
router
    .get('/', list)
    .get('/new', newest)
    .get('/recommended', recommended)
    .get('/:id', detail)
//Rutas exigidas para la creación del CRUD
router
    .post('/', moviesValidator, store)
    .put('/:id', update)
    .delete('/:id', destroy)
    /* .put('/restore/:id', restore) */

module.exports = router;