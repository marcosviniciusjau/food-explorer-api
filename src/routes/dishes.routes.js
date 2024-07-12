const { Router } = require('express')

const dishesController = require('../controllers/dishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const dishesRoutes = Router()
const dishesController = new dishesController()

dishesRoutes.use(ensureAuthenticated)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes