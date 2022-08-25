import { Router } from 'express'
import  * as productosController from '../controller/ProductosController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import {mdwValidateSchemaNewProduct} from "../middleware/productosMDW.js"
import {uploadProducts} from "../multer.js"

const ProductosRoutes = new Router();

/* ------------------------------------------------------ */
import multer from 'multer'
/* Multer config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  const upload = multer({ storage: storage })
/* ------------------------------------------------------ */

//GET '/producto' -> return all products
ProductosRoutes.get('/', 
        productosController.obtenerProductos)
//GET '/producto/:idProducto' -> returns a product by id
ProductosRoutes.get('/:idProduct', 
        productosController.obtenerUnProducto)
//GET '/producto/:categoria' -> returns all products in a category.
ProductosRoutes.get('/category/:category', 
        productosController.obtenerProductosPorCategoria)
//POST '/producto' -> create a product
ProductosRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        mdwValidateSchemaNewProduct,
        productosController.agregarProducto)
//PUT '/producto/' -> update a product by id
ProductosRoutes.put('/:idProduct', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.actualizarProducto)
//DELETE '/producto/:id' -> delete a product by id
ProductosRoutes.delete('/:idProduct', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        productosController.borrarProducto)

//SUBIR ARCHIVOS
ProductosRoutes.post('/uploadFile', 
    uploadProducts.single("image"), 
    productosController.uploadFile
  )

export default ProductosRoutes 