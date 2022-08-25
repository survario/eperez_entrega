import OrderDao from '../model/daos/OrderDao.js';
import UsuariosDao from '../model/daos/UsuariosDao.js';
import OrderDto from '../model/dtos/OrderDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'
//import { enviarWhatsapp } from './notificaciones/whatsapp.js'
//import { enviarSMS } from './notificaciones/sms.js'
import config from '../config/config.js'


export default class OrdersApi {

    constructor() {
        this.pedidosDao = new OrderDao();
        this.usuariosDao = new UsuariosDao();
    }

    async getOrders() {
        try{
            return await this.pedidosDao.getAll();
        }
        catch (err){
            logger.error(`Error requesting all orders: ${err}`);
            throw new CustomError(401, `Error requesting all orders`, err)
        }
    }   

    async getOrderById(idPedido) {
        try{
            return await this.pedidosDao.getById(idPedido);
        }
        catch (err){
            logger.error(`Error requesting the order ${idPedido}: ${err}`);
            throw new CustomError(401, `Error requesting the order ${idPedido}`, err)
        }
    }  

    async getOrdersByEmail(email) {
        if (!email) throw new CustomError(404, `The 'email' field is required. It may happen that you have logged out because the token expired, log in again. `)
        try{
            //return new PedidosDto(pedidosObj); 
            return await this.pedidosDao.getByEmail(email);
        }
        catch (err){
            logger.error(`Error requesting orders from a user: ${err}`);
            throw new CustomError(401, `Error requesting orders from a user`, err)
        }
    }   

    async addOrder(objeto) {
        try{
            //cargo el pedido
            const pedido = new OrderDto(objeto)
            await this.pedidosDao.add(pedido);
            logger.info(`Registro de pedido Ok `);
            //obtengo los datos del usuario
            const usuario = await this.usuariosDao.getByEmail(pedido.email) 
            //envio de notificaciones al admin y usuario
            await this.enviarEmailNuevoPedido(pedido.email, pedido, usuario.name, usuario.lastname)
            await this.enviarEmailNuevoPedido(config.EMAIL_ADMINISTRADOR, pedido, usuario.name, usuario.lastname)
            //await this.enviarWhatsappNuevoPedido(pedido.email, usuario.name, usuario.lastname)
            //await this.enviarSMSPedidoEnProceso(usuario.phone)
            return pedido.get();
        }
        catch (err){
            logger.error(`Error adding an order: ${err}`);
            throw new CustomError(401, `Error adding an order`, err)
        }
    }      

    async deleteOrder(idOrder) {
        try{
            return await this.pedidosDao.deleteById(idOrder);
        }
        catch (err){
            logger.error(`Error deleting order${idOrder}: ${err}`);
            throw new CustomError(401, `Error deleting order ${idOrder}`, err)
        }
    }  

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoPedido(email, pedido, nombre, apellido){
        try {
            const objetoPedidos = pedido.productos
            let listadoProductosHTML = ""
            objetoPedidos.forEach(element => {
                listadoProductosHTML = listadoProductosHTML 
                        + "<tr><td>"+element.idProducto+"</td><td>"
                        +element.name+"</td><td>"
                        +element.description+"</td><td>"
                        +element.image+"</td><td>"
                        +element.price+"</td><td>"
                        +element.cantidad+"</td></tr>"
            });
            //armo los datos que voy a enviar por email
            let correoDestino = email
            let asunto = `New order of ${nombre} ${apellido} - ${pedido.email}`
            let cuerpo = `<h1> New Order of ${nombre} ${apellido} - ${pedido.email}</h1>
            <p><strong>User email: </strong>${pedido.email}</p>
            <p><strong>Date of purchase by the user: </strong>${pedido.fechaPedida}</p>
            <p><strong>Purchased products: </strong></p>
            <p>
            <table border=1>
                <tr>
                    <th>Id Producto</th>
                    <th>name</th>
                    <th>description</th>
                    <th>image</th>
                    <th>price</th>
                    <th>amount</th>
                </tr>
                ${listadoProductosHTML}
            </table></p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`The sending of the email of the new order failed - error:${err}`) 
        }
    }   

    //enviarWhatsappNuevoPedido
    /*
    async enviarWhatsappNuevoPedido(email, nombre, apellido){
        try {                
            let from = 'whatsapp:+14155238886'  // es el celu de twilio el que envia whatsapp
            let to = process.env.WHATSAPP_USER_ADMIN
            let body = `New order of ${nombre} ${apellido} - ${email}`
            // mediaUrl: [ '' ]
            await enviarWhatsapp(from, to, body)         
        } catch (err) { 
            logger.error(`The WhatsApp delivery of the new order failed - error:${err}`) 
        }
    }   

        //enviarSMSPedidoEnProceso
        async enviarSMSPedidoEnProceso(telefonoUsuario){
            try {              
                let from = '+18647404967'  
                let to = telefonoUsuario
                let body = `Your order has been received and is in process`
                // mediaUrl: [ '' ]
                await enviarSMS(from, to, body)         
            } catch (err) { 
                logger.error(`The sending of confirmation SMS to the user failed - error:${err}`) 
            }
        }   
        */

        
}

