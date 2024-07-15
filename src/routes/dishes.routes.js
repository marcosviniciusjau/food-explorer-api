const { Router } = require('express')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get('/', dishesController.index)
dishesRoutes.post('/', verifyAuthorization('admin'),dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', verifyAuthorization('admin'), dishesController.delete)

module.exports = dishesRoutes