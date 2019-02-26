const express = require('express')

const routes = express.Router()

// Middlewares
const authMiddlware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

// Rotas
routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

routes.use(authMiddlware)

// Rotas protegidas por token jwt
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', controllers.AdController.store)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

routes.post('/purchase', controllers.PurchaseController.store)

module.exports = routes
