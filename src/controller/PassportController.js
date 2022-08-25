import passport from 'passport';
import { Strategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import logger from '../logger.js'
import { jwtOpts } from '../config/config.js'
import UsuariosApi from '../api/UsuariosApi.js' 
import {validarToken} from '../controller/UsuariosController.js' 
import globals from 'globals';
const users = new UsuariosApi();

//creation of passport strategies

//registration strategy
passport.use('registro', new Strategy({passReqToCallback:true, usernameField: 'email'}, async (req, username, password, done)=>{
    logger.info(`PassportController.js - passport.use --> registro`)
    let usuario    
    try{//valid if the user exists
        await users.obtenerUsuarioPorEmail(username) //If you find a user, it means that you are already registered.
        return done(null, false) //false: because no change was generated in the registry
    }catch(error){
        //all OK, that is, the user was not found
    }    
    try {//The user does not exist, I create it
        const datosUsuario = req.body
        usuario = await  users.crearUsuario(datosUsuario) //create user
    }catch(error){
        return done(error) 
    }
    done(null, usuario)
}))

//login strategy
passport.use('login', new Strategy({usernameField: 'email'}, async (email, password, done) => {
    logger.info(`PassportController.js - passport.use --> login`)
    globals.emailUser = email
    try{
        const user = await users.login(email, password)
        return done(null, user);
    }catch (error){
        logger.error(error);
        return done(null, false);
    }
}))

//inform how it will handle transformation session-cookies
passport.serializeUser((user, done) => {//receives user who is in the session and callback 
    logger.info(`PassportController.js - passport.serializeUser`)
    done(null, user) 
    //done(null, user.email) // en el caso que mande user.email, cuando hago la deserealizacion tengo q buscar x email y obtener el objeto usuario completo 
}) 
passport.deserializeUser((user, done) => {
    logger.info(`PassportController.js - passport.deserializeUser`)
    //user = obtenerUsuarioPorEmail(email) // en vez de ser (user,done) seria (email, done)
    done(null, user)
})

passport.use('jwt', new JWTstrategy(jwtOpts, validarToken));

export default passport;
