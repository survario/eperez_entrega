import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js'

const productos = new ProductosApi();

//devuelve todos los productos de la coleccion
export async function obtenerProductos() {
    logger.info(`GET api/products`)
    try{
        return await productos.getProductos()
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//dado un id devuelve los datos de ese producto
export async function obtenerUnProducto(producto) {
    logger.info(`GET api/products/{idProducto}`)
    try{
        return await productos.getProducto(producto.id)
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//Con los datos del body agrega un producto a la coleccion y devuelve el id creado 
export async function agregarProducto(producto) {
    logger.info(`POST api/products`)
    try{
        return await productos.addProducto(producto.datos)
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarProducto(producto) {
    logger.info(`DELETE api/products`)
    try{
       return await productos.deleteProducto(producto.id)
    }
    catch (err){
        logger.error(err);
        return err
    }
}