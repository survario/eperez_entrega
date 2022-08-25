import ShoppingCartDao from '../model/daos/ShoppingCartDao.js';
import ShoppingCartDto from '../model/dtos/ShoppingCartDto.js';

export default class ShoppingCartApi {

    constructor() {
        this.shoppingCartDao = new ShoppingCartDao();
    }
    
    async addCarrito(objeto) {
        const cart = new ShoppingCartDto(objeto)
        await this.shoppingCartDao.add(cart);
        return cart;
    }  

    async deleteCarrito(idCarrito) {
        return this.shoppingCartDao.deleteById(idCarrito);
    }  

    async getCarritosDelUsuario(emailUsuario) {
        return this.shoppingCartDao.getByEmail(emailUsuario);
    }     

    async addProductoAlCarritoByEmail(emailUser, objProductoNuevo) {
        return this.shoppingCartDao.updateAgregarProductoAlCarritoByEmail(emailUser, objProductoNuevo);
    }  

     async deleteProductoAlCarritoByEmail(emailUser, idProducto) {
        return this.shoppingCartDao.updateEliminarProductoAlCarritoByEmail(emailUser, idProducto);
     }        

    //update the value of "cantidad" of products in the cart
    async updateCantidadInProductsCart(emailUser, cantidad) {
        return this.shoppingCartDao.updateCantidadInProductsCart(emailUser, cantidad);
    }
}
