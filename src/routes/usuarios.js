import { Router } from 'express'
import passport from '../controller/PassportController.js'
import  * as userController from '../controller/UsuariosController.js'
import * as webController from '../controller/webController.js'
import {mdwValidateSchemaNewUsuario} from "../middleware/usuariosMDW.js"
import {uploadUsers} from "../multer.js"

const UsersRoutes = new Router();

UsersRoutes.get('/', webController.getInicio);

//GET '/' --> returns all users 
UsersRoutes.get('/allUsers', userController.obtenerUsuarios);

//POST /registro --> create a new user
UsersRoutes.post('/registro',  
    mdwValidateSchemaNewUsuario,
    passport.authenticate('registro', {
    failureRedirect: '/failRegister'}),
    userController.successRegister
);
UsersRoutes.get('/failRegister', userController.failRegister);
UsersRoutes.post('/failRegister', userController.failRegister);
UsersRoutes.get('/successRegister', userController.successRegister);
UsersRoutes.post('/successRegister', userController.successRegister);

//POST '/login' --> validate the login, receive email and password of the user
UsersRoutes.post('/login', 
    passport.authenticate('login', {
        failureRedirect: '/failLogin'
    }),
    userController.successLogin
);
UsersRoutes.post('/failLogin', userController.failLogin);
UsersRoutes.get('/failLogin', userController.failLogin);

//GET '/logout' --> logs out the user
UsersRoutes.get('/logout', userController.logout);

//DELETE /deleteUser/{emailUser} --> to delete a user by email
UsersRoutes.delete('/deleteUser/:email', userController.borrarUsuario);

//SUBIR ARCHIVOS
UsersRoutes.post('/uploadFile', 
    uploadUsers.single("image"), 
    userController.uploadFile
  )

export default UsersRoutes 