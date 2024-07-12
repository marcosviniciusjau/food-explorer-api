const { Router } = require("express") 
const multer = require("multer") 

const uploadConfig = require("../configs/upload") 
const ensureAuthenticated = require("../middlewares/ensureAuthenticated") 

const adminsController = require("../controllers/adminsController") 
const adminsValidatedController = require("../controllers/adminsValidatedController") 
const adminPhotoController = require("../controllers/adminPhotoController") 

const adminsRoutes = Router() 

const adminsController = new adminsController()
const adminsValidatedController = new adminsValidatedController() 
const adminPhotoController = new adminPhotoController() 

const upload = multer(uploadConfig.MULTER) 

adminsRoutes.post("/", adminsController.create)
adminsRoutes.get("/validated", ensureAuthenticated, adminsValidatedController.index)
adminsRoutes.put("/", ensureAuthenticated, adminsController.update) 
adminsRoutes.patch("/photo", ensureAuthenticated, upload.single("photo"), adminPhotoController.update) 

module.exports = adminsRoutes 