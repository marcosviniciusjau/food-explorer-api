const { Router } = require('express')

const IngredientsController = require('../controllers/IngredientsController')

const ingredientsRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ingredientsController = new IngredientsController()
ingredientsRoutes.use(ensureAuthenticated)

ingredientsRoutes.get('/', ingredientsController.index)

module.exports = ingredientsRoutes