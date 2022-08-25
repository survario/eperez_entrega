import express, { json, urlencoded } from 'express';
import passport from './controller/PassportController.js';
// routes
import UsersRoutes from './routes/usuarios.js';
import ProductosRoutes from './routes/productos.js';
import ShoppingCartRoutes from './routes/shoppingCart.js';
import OrdersRoutes from './routes/orders.js';
import ChatRoutes from './routes/chat.js';
import webRoutes from './routes/web.js';
import DefaultRoutes from "./routes/default.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from './swaggerSpecs.js';
import { graphqlMiddleware } from './graphqlMiddleware.js'

export function crearServidor() {

    const app = express()
    app.use(express.static('public'))
    app.use(json()) //mdw para extraer el json que viene en las peticiones
    app.use(urlencoded({ extended: true }))  //mdw para poder extraer los datos que vienen en la url cuando se envia un formulario (el true para poder enviar objetos anidados)
    //app.use(cors()); //para comunicarme con el front 

    app.set('view engine', 'ejs') //Configuracion del motor de vistas 

    app.use(passport.initialize()) 

    // routes apiRestFull
    app.use('/web', webRoutes) //Antes era / pero tuve q modificarlo por el TP final
    app.use('/', UsersRoutes) //usuarios que realizan la compra de los productos. Antes era api/usuarios
    app.use('/api/products', ProductosRoutes) //productos que tiene el sitio
    app.use('/api/shoppingcartproducts', ShoppingCartRoutes) //shoppingCart de los usuarios    
    app.use('/api/orders', OrdersRoutes) // ordenes realizadas por el usuario, carrito se borra
    app.use('/api/chat', ChatRoutes) // mensajes del chat 

    //documentacion
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    //Graphql
    app.use('/graphql', graphqlMiddleware)

    //routes not found
    app.use('/*', DefaultRoutes)

    return app

}