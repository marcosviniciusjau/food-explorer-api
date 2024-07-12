const { Router } = require('express')

const MovieTagsController = require('../controllers/dishesTagsController')

const movieTagsRoutes = Router()

const movieTagsController = new MovieTagsController()

movieTagsRoutes.get('/:admin_id', movieTagsController.index)

module.exports = movieTagsRoutes