const router = require('express').Router();
const {list, detail, store, update, destroy} = require('../../controllers/genresController');
const genresValidator = require('../../validations/genresValidator');


/* /api/v1/genres */
router
    .get('/', list)
    .get('/:id', detail)
    .post('/', genresValidator, store)
    .put('/:id', update)
    .delete('/:id', destroy)


module.exports = router;