import schemaNewUser from '../schemas/usuariosSchemas.js'
import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'

const usuarios = new UsuariosApi();

export async function mdwValidateSchemaNewUsuario(req, res, next) {
    logger.info(`middleware/usuarios.js: mdwValidateSchemaNewUsuario`)
    let data
    try {
        data = await schemaNewUser.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Failed to validate users schema - Error: ${err.details[0].message}`)
        return res.status(400).json({ descripcion: `Failed to validate users schema - Error: ${err.details[0].message}` })
    }

    try {
        if (await usuarios.existeEmail(data.email)) {
            return res.status(400).json({ descripcion: 'The email is already registered' })
        }
        //if (await usuarios.existeUsername(data.username))
        //    return res.status(400).json({ descripcion: 'El username ya se encuentra registrado' })
    }
    catch (err) {
        logger.error(`Error running user validations - Error: ${err}`)
        return res.status(500).json({ descripcion: `Error running user validations - Error: ${err}` })
    }

    next();

}