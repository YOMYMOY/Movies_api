const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage("El campo 'title' es obligatorio").bail()
        .isLength({max : 40})
        .withMessage("Menos de 10 caracteres"),
    check('rating')
        .notEmpty()
        .withMessage("El campo 'rating' es obligatorio"),
    check('awards')
        .notEmpty()
        .withMessage("El campo 'awards' es obligatorio"),
    check('release_date')
        .notEmpty()
        .withMessage("El campo 'release_date' es obligatorio")
]