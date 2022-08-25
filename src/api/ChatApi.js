import moment from 'moment'
import ChatDao from '../model/daos/ChatDao.js';
import ChatDto from '../model/dtos/ChatDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

class ChatApi {
    
    constructor() {
        this.chatDao = new ChatDao();
    }

    //getMensajesChat
    async getMensajesChat() {        
        try{
            return await this.chatDao.getAll()
        }
        catch (err){
            logger.error(`Error getting all chat messages: ${err}`);
            throw new CustomError(401, `Error getting all chat messages:`, err)
        }
    }

    //getMensajesChat
    async getMensajesChatPorEmail(email) {        
        try{
            return await this.chatDao.getByEmail(email)
        }
        catch (err){
            logger.error(`Error getting all chat messages from ${email}: ${err}`);
            throw new CustomError(401, `Error getting all chat messages from ${email}:`, err)
        }
    }

    //addMensajeChat
    async addMensajeChat(data) {
        try{
            data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
            const mensajeChat = new ChatDto(data)
            await this.chatDao.add(mensajeChat)
            return await this.chatDao.getAll()
        }
        catch (err){
            logger.error(`Error adding message to chat: ${err}`);
            throw new CustomError(401, `Error adding message to chat`, err)
        }
    }  

    //delete a msg
    async deleteMensajesChat(idMensajeChat) {
        try{
            return await this.chatDao.deleteById(idMensajeChat);
        }
        catch (err){
            logger.error(`Error deleting message ${idMensajeChat}: ${err}`);
            throw new CustomError(401, `Error deleting message ${idMensajeChat}`, err)
        }
    }  
}

export default ChatApi