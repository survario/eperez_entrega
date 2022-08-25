import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'

export default class ProductosDao extends ContainerDao {

  constructor() {
    super('products')
  }
  
  async getById(id) {
    return super.getById({ id: id })
  }

  async getByCategoria(category) {
    return super.listByQuery({ category: category })
  }
  
  async deleteById(id) {
    return super.deleteById({ id: id })
  }

  async searchByName(name) {
    return super.listByQuery({ name: name })
  }

  async update(id, {
    code,
    name,
    description,
    price,
    image,
    stock,
    category,
    //features
  }) {

    try {
      await this.collection.updateOne(
        {
          id: id
        },
        {
          '$set':
          {
            code: code,
            name: name,
            description: description,
            price: price,
            image: image,
            stock: stock,
            category: category,
            //features: features
          }
        })

    } catch (err) {
      logger.error(err)
      throw new CustomError(500, 'Error update mongo document to collection by id', err)
    }
  }


}