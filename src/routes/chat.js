import { Router } from 'express'
import  * as chatController from '../controller/ChatController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import {mdwValidateSchemaNewMensaje} from "../middleware/chatsMDW.js"

const ChatRoutes = new Router();

//GET '/mensajes' -> devuelve todos los mensajes
ChatRoutes.get('/', 
        passport.authenticate('jwt', { session: false }), 
        chatController.obtenerMensajesChat)
//GET '/mensajes' -> devuelve todos los mensajes de un usuario en particular
ChatRoutes.get('/:email', 
        passport.authenticate('jwt', { session: false }), 
        chatController.obtenerMensajesChatPorEmail)
//POST '/mensajes' -> alta de nuevo mensaje de chat 
ChatRoutes.post('/', 
        passport.authenticate('jwt', { session: false }), 
        mdwValidateSchemaNewMensaje,
        chatController.agregarMensajesChat)
//GET '/mensajes/:idMensajeChat' -> devuelve un mensaje del chat x id
ChatRoutes.delete('/:idMensajeChat', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        chatController.borrarMensajeChat)

export default ChatRoutes 