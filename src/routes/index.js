const { Router } = require('express')

const usersRoutes = require('./user.routes')
const dishesRoutes = require('./dishes.routes')
const categoriesRoutes = require('./categories.routes')
const ingredientsRoutes = require('./ingredients.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/sessions', sessionsRoutes)

module.exports = routes