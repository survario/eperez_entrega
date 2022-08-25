import Joi from 'joi'

const schemaNewUser = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        password:Joi.string()
            .min(2)
            .max(15)
            .required(),
        username: Joi.string()
            .max(15),
        name: Joi.string()
            .required(),
        lastname: Joi.string()
            .required(),
        address: Joi.string(),        
        dateBirth: Joi.string(),
        phone: Joi.string()
            .required(),
        avatar: Joi.string()
    }
)

export default schemaNewUser;
