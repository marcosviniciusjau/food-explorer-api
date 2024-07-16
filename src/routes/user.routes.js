const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated") 

const UsersController = require("../controllers/UsersController") 
const UserValidatedController = require("../controllers/UserValidatedController") 

const usersRoutes = Router() 

const userController = new UsersController()
const usersValidatedController = new UserValidatedController()

usersRoutes.post("/", userController.create)
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index)
usersRoutes.put("/", ensureAuthenticated, userController.update) 

module.exports = usersRoutes 