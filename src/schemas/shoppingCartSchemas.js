import Joi from 'joi'

const schemaNewShoppingCart = Joi.object(
    {
        productId: Joi.string()
            .required(),        
    }
)

export default schemaNewShoppingCart;