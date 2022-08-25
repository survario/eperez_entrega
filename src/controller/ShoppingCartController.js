import ShoppingCartApi from '../api/ShoppingCartApi.js'
import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js'
import globals from 'globals';

const shoppingCart = new ShoppingCartApi();
const products = new ProductosApi();

//returns the cart of the logged in user
export async function getCartUserLogged(req, res) {
    logger.info(`GET api/shoppingcartproducts - user: ${globals.emailUser}`)
    try{
        const cartList = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
        res.status(200).json(cartList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

async function getProductWithDetails(productId, cantidad){
    try{
        const productDetails = await products.getProducto(productId)
        return  {
                    "idProducto": productDetails.id,
                    "name": productDetails.name,
                    "description": productDetails.description,
                    "image": productDetails.image,
                    "price": productDetails.price,
                    "cantidad": cantidad
                }
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//receive and add a product to the cart. If the cart does not exist create it
export async function addProductIdToCart(req, res) {    
    let productId = req.body.productId;
    logger.info(`POST api/shoppingcartproducts `)
    try{
        //Validate that the product exists
        await products.getProducto(productId)

        //If the cart does not exist I create it
        const carrito = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
        let carritoList;
        if (globals.emailUser === undefined){
            res.status(404).json({ msg: "It is not possible to add a product to the cart since the user is not logged in or the token has expired"})
        }else{
            if (carrito.length === 0) {
                logger.info(`Create new cart ${globals.emailUser} and add the product ${productId}`)
                const productWithDetails = await getProductWithDetails(productId, 1)
                carritoList = await shoppingCart.addCarrito({
                    "emailUsuario": globals.emailUser,
                    "direccionEntrega": "",
                    "productos": [productWithDetails]
                })
            }else{ 
                //Valid if the product is already in the cart
                const listProductsCart = carrito[0].productos
                let existProductInCart = false
                let cantidad = 1
                listProductsCart.forEach(product => {
                    if (product.idProducto === productId) {
                        existProductInCart = true
                        cantidad = product.cantidad
                    }                    
                })                 
                if (existProductInCart) {//If the product exists, Add 1 in quantity and delete de product in cart
                    logger.info(`Add amount 1 to the product ${productId}, to the cart of ${globals.emailUser}`)
                    cantidad = cantidad + 1
                    logger.info(`delete the product ${productId}, to the cart of ${globals.emailUser}`)
                    shoppingCart.deleteProductoAlCarritoByEmail(globals.emailUser, productId)
                }
                logger.info(`Add the cart of ${globals.emailUser} the product ${productId}`)
                const productWithDetails = await getProductWithDetails(productId, cantidad)
                carritoList = await shoppingCart.addProductoAlCarritoByEmail(globals.emailUser, productWithDetails)
            }
            res.status(200).json(carritoList)
        }
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//receive and delete a product to the indicated cart  
export async function deleteProductInCart(req, res) {    
    let productId = req.params.productId;
    logger.info(`DELETE api/shoppingcartproducts `)
    try{
        //Validate if exists the cart
        const carrito = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
        let carritoList;
        if (globals.emailUser === undefined){
            res.status(404).json("It is not possible to delete a product to the cart since the user is not logged in or the token has expired")
        }else{
            if (carrito.length === 0) { 
                logger.info(`There is no cart for the user ${globals.emailUser}`)
                res.status(200).json({msg: "The product was not deleted because there is no cart for the user"})
            }else{ 
                //Valid if the product is already in the cart
                const listProductsCart = carrito[0].productos
                let existeProducto = false
                let cantidad = 1
                listProductsCart.forEach(product => {
                    if (product.idProducto === productId) {
                        existeProducto = true
                        cantidad = product.cantidad
                    }                    
                })      
                if (existeProducto) {//If the product exists, Rest 1 in quantity and delete de product in cart
                    logger.info(`Rest amount 1 to the product ${productId}, to the cart of ${globals.emailUser}`)
                    cantidad = cantidad - 1
                    logger.info(`delete the product ${productId}, to the cart of ${globals.emailUser}`)
                    shoppingCart.deleteProductoAlCarritoByEmail(globals.emailUser, productId)
                    if (cantidad === 0){
                        const carritoActualizado = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
                        res.status(200).json(carritoActualizado)
                    }else{
                        logger.info(`Add the cart of ${globals.emailUser} the product ${productId}`)
                        const productWithDetails = await getProductWithDetails(productId, cantidad)
                        carritoList = await shoppingCart.addProductoAlCarritoByEmail(globals.emailUser,productWithDetails)
                        res.status(200).json(carritoList)
                    }
                }else{
                    const carritoActualizado = await shoppingCart.getCarritosDelUsuario(globals.emailUser)
                    res.status(200).json(carritoActualizado)
                }
            }
        }
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
