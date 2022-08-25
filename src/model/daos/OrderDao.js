import ContainerDao from './ContainerDao.js';

export default class OrderDao extends ContainerDao {

  constructor() {
    super('orders')
  }
  
  async getById(id) {
    return super.getById({ id: id })
  }

  async getByEmail(email)
  {
    return super.listByQuery({"email":email})
  }

  async deleteById(id) {
    return super.deleteById({ id: id })
  }

}