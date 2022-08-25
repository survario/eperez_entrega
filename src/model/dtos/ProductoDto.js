import NUID from 'nuid'
import moment from 'moment'

export default class ProductoDto {

    _id;
    id;
    code;
    dateHour;
    name;
    description;
    price;
    image;
    stock;
    category;
    //features;

    //constructor({ _id, id, code, dateHour, name, description, price, image, stock, category, features}) {
    constructor({ _id, id, code, dateHour, name, description, price, image, stock, category}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.dateHour = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id
            this.id = id;       
            this.dateHour = dateHour;     
        }
        
        this.code = code
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.stock = stock;
        this.category = category;
    //    this.features = features;
    }

    get() {
        return this
      }

    getforCarrito(){
        return {
            id: this.id,
            code: this.code,
            dateHour: this.dateHour,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            stock: this.stock,
            category: this.category,
            //features: this.features
        }
    }

}