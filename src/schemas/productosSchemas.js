import Joi from 'joi'

const schemaNewProduct = Joi.object(
    {
        id: Joi.string(),
        code: Joi.number()
            .required(),
        name: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        price: Joi.number()
            .precision(2)
            .positive()
            .required(),
        image: Joi.string()
            .required(),
        stock: Joi.number()
            .integer()
            .positive()
            .required(),
        category: Joi.string()
            .required()
        /*    
            ,
        features: Joi.array().items( Joi.object(
            {waist: Joi.string().required(), colors: Joi.string().required() }
            )
        )
        */
    }
)

export default schemaNewProduct;
