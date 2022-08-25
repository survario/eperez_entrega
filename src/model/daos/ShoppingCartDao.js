import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'
import logger from '../../logger.js'

export default class ShoppingCartDao extends ContainerDao {

  constructor() {
    super('shoppingCart')
  }

  async getByEmail(email) {
    return super.listByQuery({ emailUsuario: email })
  }
  
  //add a product to cart
  async updateAgregarProductoAlCarritoByEmail(emailUser, objProductoNuevo) {
    try {
      await this.collection.updateOne(
        { emailUsuario: emailUser },
        { '$push': { productos: objProductoNuevo } })
      return await this.getByEmail(emailUser)
    }
    catch (err) {
      throw new CustomError(500, `Error adding product to cart`, err)
    }
  }

  //delete a product to cart
  async updateEliminarProductoAlCarritoByEmail(emailUser, productId) {
    logger.info(`CarritosDao - Borrar el producto: ${productId} del carrito con email: ${emailUser}`) 
    try {
      await this.collection.updateOne(
        { emailUsuario: emailUser },
        { '$pull': { productos: { "idProducto" : { $eq: productId } } } })
      return await this.getByEmail(emailUser)
    }
    catch (err) {
      throw new CustomError(500, `Error when deleting a product to the cart by emailUser`, err)
    }
  }

  async deleteById(id) {
    return super.deleteById({ id: id })
  }

}
