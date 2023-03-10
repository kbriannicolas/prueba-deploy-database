const { check } = require('express-validator');

const validate = [
    check('title').notEmpty().withMessage('title is required'),
    check('rating').notEmpty().withMessage('rating is required'),
    check('awards').notEmpty().withMessage('awards is required'),
    check('release_date').notEmpty().withMessage('release_date is required'),
    check('length').notEmpty().withMessage('length is required'),
    check('genre_id').notEmpty().withMessage('genre is required')

]


module.exports=validate;