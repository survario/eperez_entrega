import NUID from 'nuid'
import moment from 'moment'

export default class ShoppingCartDto {

    _id;
    id;
    estado;
    emailUsuario;
    productos;
    fechaUltModif;
    direccionEntrega;

    constructor({ _id, id, estado, emailUsuario, productos, fechaUltModif, direccionEntrega}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "abierto"
            this.fechaUltModif = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaUltModif = fechaUltModif
        }

        this.emailUsuario = emailUsuario;
        this.productos = productos;
        this.direccionEntrega = direccionEntrega;
    }

    get() {
        return this
    }

}