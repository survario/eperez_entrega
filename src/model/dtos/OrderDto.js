import NUID from 'nuid'
import moment from 'moment'

export default class OrderDto {
    _id;
    id;
    email;
    productos;
    estado; //pendiente, procesando, entregado, etc
    fechaPedida; //fecha que se hizo el pedido de compra

    constructor({ _id, id, email, productos, estado, fechaPedida}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "generada"
            this.fechaPedida = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaPedida = fechaPedida
        }

        this.email = email;
        this.productos = productos;
    }

    get() {
        return this
    }

}