import { Router } from 'express'
import  * as ShoppingCartController from '../controller/ShoppingCartController.js'
import passport from '../controller/PassportController.js'
import {mdwValidateSchemaNewShoppingCart} from "../middleware/shoppingCartMDW.js"

const ShoppingCartRoutes = new Router();

//GET '/shoppingCart' -> devuelve todos los productos que hay en el carrito 
ShoppingCartRoutes.get('/', 
        passport.authenticate('jwt', { session: false }), 
        ShoppingCartController.getCartUserLogged)
//POST '/shoppingCart' -> agrega un producto al carrito. Si el carrito no existe lo crea
ShoppingCartRoutes.post('/', 
        passport.authenticate('jwt', { session: false }),  
        mdwValidateSchemaNewShoppingCart,
        ShoppingCartController.addProductIdToCart)
//DELETE '/shoppingCart/:productId' -> elimina un producto del carrito
ShoppingCartRoutes.delete('/:productId', 
        passport.authenticate('jwt', { session: false }), 
        ShoppingCartController.deleteProductInCart)

export default ShoppingCartRoutes 