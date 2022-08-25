import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js'

const products = new ProductosApi();

//returns all products in the collection
export async function obtenerProductos(req, res) {
    logger.info(`GET api/products`)
    try{
        const productsList = await products.getProductos()
        res.status(200).json(productsList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//given an id returns the data of that product
export async function obtenerUnProducto(req, res) {
    logger.info(`GET api/products/{idProduct}`)
    try{
        let id = req.params.idProduct;
        const product = await products.getProducto(id)
        res.status(200).json(product)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//returns all products in a category
export async function obtenerProductosPorCategoria(req, res) {
    let category = req.params.category;
    logger.info(`GET api/products/feature/${category}`)
    try{
        const product = await products.getProductoPorCategoria(category)
        res.status(200).json(product)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//With the body data add a product to the collection 
export async function agregarProducto(req, res) {
    logger.info(`POST api/products`)
    try{
        let objeto = req.body;
        const product = await products.addProducto(objeto)
        res.status(201).json(product)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//given a product id by parameter updates the product with the data sent in the body
export async function actualizarProducto(req, res) {
    let id = req.params.idProduct;
    logger.info(`PUT api/products/${id}`)
    try{
        let object = req.body;
        const product = await products.putProducto(id, object);
        res.status(200).json(product);
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//given an id by parameter deletes the same from the collection
export async function borrarProducto(req, res) {
    logger.info(`DELETE api/products/`)
    try{
        let id = req.params.idProduct;
        await products.deleteProducto(id)
        res.status(204).json({msg: 'the product was removed successfully'}) //the message will not be displayed because the code is 204 and it does not return content. If I want to show put 200
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

export async function uploadFile(req, res) {    
    let image = "product_default.png"
    if (req.file !== undefined){
        image = req.file.filename
    }
    res.status(200).json({url: `public/uploads/products/${image}`})
}