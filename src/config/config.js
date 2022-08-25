import dotenv from 'dotenv';
//import parseArgs from 'minimist';
import { ExtractJwt as ExtractJWT } from 'passport-jwt';

//const options= {alias:{p:"port", m:"modo"}};
//const puerto = parseArgs(process.argv,options).port;
//const modo = parseArgs(process.argv,options).modo;

dotenv.config();

export const jwtOpts = {
  secretOrKey: process.env.SECRET || 'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: process.env.JWT_IGNORE_EXPIRE || false,
  expireIn: parseInt(process.env.JWT_TIME_EXPIRE) || 3600,
}

export const ServidorEnvioEmail = {
  service: process.env.MAIL_SMTP,
  //host: process.env.MAIL_SMTP,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
  MODO: process.env.MODE || 'FORK',
  MONGO_URL: process.env.MONGO_URL||'noURL',
  MONGO_DB: process.env.MONGO_BASE||'ecommerce', 
  //EMAIL_ADMINISTRADOR: "admin@admin.com"
  EMAIL_ADMINISTRADOR: process.env.ADMIN_EMAIL || "admin@admin.com"
}
