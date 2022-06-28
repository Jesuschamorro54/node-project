'use strict'

var express = require('express')
var multipart = require('connect-multiparty')
var ProjectController = require('../controllers/projectController')

const multipartMiddleware = multipart({uploadDir: './uploads'})
const router = express.Router();


router.get('/', ProjectController.home)
router.get('/projects', ProjectController.getProjects)
router.get('/project/:id?', ProjectController.getProject)
router.get('/image/:name?', ProjectController.getImage)




router.post('/test', ProjectController.test)
router.post('/save-project', ProjectController.saveProjects)
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage)


router.put('/project/:id?', ProjectController.update)


router.delete('/project/:id?', ProjectController.deleteProject)




module.exports = router;