import UsuariosDao from '../model/daos/UsuariosDao.js';
import UsuarioDto from '../model/dtos/UsuarioDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'
import config from '../config/config.js'

export default class UsuariosApi {

    constructor() {
        this.usuariosDao = new UsuariosDao();
    }

    async getUsers() {
        logger.info(`UsuariosApi.js - getUsers`);
        return this.usuariosDao.getAll();
    }   

    //obtiene los datos de un usuario segun email ingresado
    async getUsuario(email) {
        logger.info(`UsuariosApi.js - getUsuario(${email})`);
        return this.usuariosDao.getByEmail(email);
    }   

    //alta de usuario nuevo
    async crearUsuario(objetoUsuario){
        logger.info(`UsuariosApi.js - crearUsuario`);
        if (!objetoUsuario.email) throw new CustomError(404, `The 'email' field is required `)
        if (!objetoUsuario.password) throw new CustomError(404, `The 'password' field is required`)
        
        try{
            const usuario = new UsuarioDto(objetoUsuario)
            usuario._id = await this.usuariosDao.add(usuario)
            logger.info(`User Registration Ok`);
            await this.enviarEmailNuevoUsuario(usuario)
            return usuario.get()
        }
        catch (err){
            logger.error(`Error creating user: ${err}`);
            throw new CustomError(401, `Error creating user`, err)
        }
    }

    //deletePedido
    async deleteUsuario(email) {
        logger.info(`UsuariosApi.js - deleteUsuario`);

        try{
            return await this.usuariosDao.deleteByEmail(email);
        }
        catch (err){
            logger.error(`Error when deleting the user with email: ${email}: ${err}`);
            throw new CustomError(401, `Error when deleting the user with email: ${email}`, err)
        }
    }  

    //login de usuario
    async login(email, password){
        logger.info(`UsuariosApi.js - login`)
        try{
            const data = await this.usuariosDao.getByEmail(email)
            const usuario = new UsuarioDto(data)
            if (!usuario.isValidPassword(password)) 
                return false
            else
                return usuario.get();
        }
        catch(err){            
             logger.error(`Error logging in: ${JSON.stringify(err)}`)    
             throw new CustomError(401, `Error logging in`, err)         
        }
    }

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoUsuario(objetoUsuario){
        logger.info(`UsuariosApi.js - enviarEmailNuevoUsuario`);
        try {
            let correoDestino = config.EMAIL_ADMINISTRADOR
            let asunto = 'New register'
            let cuerpo = `<h1> New register </h1>
            <p><strong>Email: </strong>${objetoUsuario.email}</p>
            <p><strong>Username: </strong>${objetoUsuario.username}</p>
            <p><strong>Name: </strong>${objetoUsuario.name}</p>
            <p><strong>LastName: </strong>${objetoUsuario.lastname}</p>
            <p><strong>Address: </strong>${objetoUsuario.address}</p>
            <p><strong>Date of Birth: </strong>${objetoUsuario.dateBirth}</p>
            <p><strong>Phone: </strong>${objetoUsuario.phone}</p>
            <p><strong>Avatar: </strong>${objetoUsuario.imagenUrl}</p>
            <p><strong>Roles: </strong>${objetoUsuario.roles}</p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`Sending email failed - error:${err}`) 
        }
    }   

    async existeEmail(email) {
        logger.info(`UsuariosApi.js - existeEmail ${email}`);
        try {
            await this.usuariosDao.getByEmail(email);
            return true;
        }
        catch (err) {
            logger.info(`the email don't exists in the Database - msg: ${err.descripcion}`)
            if (err.estado == 404) return false;
            else throw err
        }
    }
    
    async existeUsername(username) {
        logger.info(`UsuariosApi.js - existeUsername ${username}`);
        try {
            await this.usuariosDao.getByUsername(username);
            return true;
        }
        catch (err) {
            logger.error(`Failed to validate if the username already exists in the Database - error:${err}`)
            if (err.estado == 404) return false;
            else throw err
        }
    }

}