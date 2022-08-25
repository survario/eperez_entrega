import ProductsDao from '../model/daos/ProductosDao.js';
import ProductDto from '../model/dtos/ProductoDto.js';

export default class ProductosApi {

    constructor() {
        this.productosDao = new ProductsDao();
    }

    async getProductos() {        
        return this.productosDao.getAll();
    }   

    async getProducto(id) {
        const productosObj = await this.productosDao.getById(id);
        return new ProductDto(productosObj); 
    }   

    async getProductoPorCategoria(category) {
        return this.productosDao.getByCategoria(category); 
    }  

    async addProducto(object) {
        const product = new ProductDto(object)
        await this.productosDao.add(product);
        return product;
    }   

    async putProducto(id, object) {
        await this.productosDao.update(id, object);
        const productsObj = await this.productosDao.getById(id)
        return new ProductDto(productsObj);
    }   

    async deleteProducto(id) {
        return this.productosDao.deleteById(id);
    }       
    
}
