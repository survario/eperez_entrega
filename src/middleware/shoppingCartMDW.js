import schemaNewCarrito from '../schemas/shoppingCartSchemas.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewShoppingCart(req, res, next) {
    logger.info(`middleware/shoppingCartMDW.js: mdwValidateSchemaNewShoppingCart`)
    try {
        await schemaNewCarrito.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de shopping cart  - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de shopping cart - Error: ${err}` })
    }

    next();

}