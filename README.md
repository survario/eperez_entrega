Emmanuel Perez Bobadilla - Entrega Final Backend

Para iniciar la aplicación:

1. Instale las dependecias con el comando:
### `npm install`

2. Configure el archivo .env con las variables de entorno requeridas.
Para probar las funcionalidades de admin, debe estar logueado con el email definido como admin en las variables de entorno.

3. Ejecute la aplicación desde el directorio raíz de esta con el comando:
### `npm start`

Link a la aplicación despegada en HEROKU:

Vistas Implementadas
/web
/web/infoServer
/web/login
/web/chat

El resto de las Rutas se encuentran Implememntadas para Postman


--------------------------------Agosto 2022-----------------------------------

#
## Example file .env 

datos de eejemplo no válidos

// development / production

NODE_ENV=development

HOST=localhost

PORT=8080

//JWT

SECRET='PALABRA_SECRET'

JWT_IGNORE_EXPIRE=false

JWT_TIME_EXPIRE=3600

//Configuracion de persistencia PRODUCCION

MONGO_URL='mongodb+srv://user:password@cluster0.2ycpm.mongodb.net/?retryWrites=true&w=majority'

MONGO_BASE=ecommerce


//configuracion del correo para enviar emails, whatsapp y sms

MAIL_SMTP = 'gmail'

MAIL_PORT = 555

MAIL_USER = 'email@gmail.com'

MAIL_PASS = 'kkkkkkkkkkkkkkkk'

MAIL_USER_ADMIN = 'email@gmail.com'


WHATSAPP_USER_ADMIN = 'whatsapp:+5491111111111'

TWILIO_ACCOUNTSID = 'AC37e209999999999296970fff'

TWILIO_AUTHTOKEN = 'd99999g99999999g99999g'

