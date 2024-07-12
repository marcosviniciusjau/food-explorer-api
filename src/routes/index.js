const { Router } = require('express')

const adminsRoutes = require('./admin.routes')
const dishesRoutes = require('./dishes.routes')
const movieTagsRoutes = require('./movie_tags.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/admins', adminsRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/movie_tags', movieTagsRoutes)
routes.use('/sessions', sessionsRoutes)

module.exports = routes