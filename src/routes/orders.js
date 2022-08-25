import { Router } from 'express'
import  * as ordersController from '../controller/OrdersController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'

const OrdersRoutes = new Router();

//GET '/api/orders' -> devuelve las ordenes realizadas por el usuario
OrdersRoutes.get('/', 
            passport.authenticate('jwt', { session: false }), 
            ordersController.getOrders)

//GET '/api/orders' -> pasa el carrito de compras a ordenes y borra el carrito  
OrdersRoutes.post('/', 
            passport.authenticate('jwt', { session: false }), 
            ordersController.createOrder)

//DELETE '/api/orders/{idOrder}' -> delete a order by id           
OrdersRoutes.delete('/:idOrder', 
            passport.authenticate('jwt', { session: false }), 
            esAdministrador,
            ordersController.deleteOrder)

//GET '/api/orders/{idOrder}' -> return a order by id
OrdersRoutes.get('/:idOrder', 
            passport.authenticate('jwt', { session: false }), 
            esAdministrador,
            ordersController.getOrderById)

//GET '/api/orders/{email}' -> return a order by email
OrdersRoutes.get('/user/:email', 
            passport.authenticate('jwt', { session: false }), 
            esAdministrador,
            ordersController.getOrdersByEmail)

export default OrdersRoutes 