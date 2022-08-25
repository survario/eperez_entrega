import UsersApi from '../api/UsuariosApi.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../config/config.js'
import globals from 'globals';

const users = new UsersApi();

//returns all users 
export async function obtenerUsuarios(req, res) {
    logger.info(`UsuariosController.js: obtenerUsuarios`)
    try{
        const usuariosList = await users.getUsers()
        res.status(200).json(usuariosList)
    }
    catch (err){
        logger.warn(err)
        res.status(err.estado).json(`Failed to find all users: ${err}`)
    }
}

//to log out the user
export function logout(req, res){
    logger.info(`UsuariosController.js: logout`)
    if (req.isAuthenticated()){
        globals.emailUser = ""
        req.logout()
    }
    res.status(200).json({msg: `The user is already logged out.`})
}

//delete the user by email
export async function borrarUsuario(req, res) {    
    let email = req.params.email;
    logger.info(`UsuariosController.js: borrarUsuario --> ${email}`)
    try{
        await users.deleteUsuario(email)
        res.status(204).json({msg: `the user ${email} was removed successfully`})
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(`Error deleting user: ${err}`)
    }
}

//validate token
export function validarToken(token, cb) {
    logger.info(`UsuariosController.js: validarToken`)
    if (token.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('The token has expired, you must log in again to generate a new token')
        return cb(null, false)
    }
    else return cb(null, token.user);
}

//validate if the user is an administrator
export function esAdministrador(req, res, next) {
    logger.info(`UsuariosController.js: esAdministrador`)
    let administrador = false
    req.user.roles.forEach(element => {
        if (element == 'admin')
            administrador = true
    });

    if(administrador)
        next()
    else{
        logger.warn(`the user ${req.user.email} do not have administrator permissions and wanted to access an unauthorized route.`);
        res.status(401).json({ error: `Unauthorized route. the user ${req.user.email} do not have administrator permissions.` })
    }

}

//successRegister
export async function successRegister(req, res){
    logger.info(`UsuariosController.js: successRegister`)
    res.status(201).json({msg: `Registration was successful`}) //201 crear
}

//failRegister
export async function failRegister(req, res){
    logger.info(`UsuariosController.js: failRegister`)
    res.status(400).json({err: 'Error registering a new user'})
}

//successLogin
export function successLogin(req, res){
    logger.info(`UsuariosController.js: successLogin`)
    const token = jwt.sign({ user: req.user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
    res.status(200).json({msg: `To be able to access the private api you must enter the token ${token}`})
}

//failLogin
export function failLogin(req, res){
    logger.info(`UsuariosController.js: failLogin`)
    res.status(401).json({err: 'Error logging in. The email or password is incorrect'}) //401 error autenticacion
}


export async function uploadFile(req, res) {    
    let image = "user_default.png"
    if (req.file !== undefined){
        image = req.file.filename
    }
    res.status(200).json({url: `public/uploads/users/${image}`})
}