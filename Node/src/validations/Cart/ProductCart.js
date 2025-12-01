const Joi = require("joi");

/**
 * @typedef {Object} ProductCartDTO
 * @property {number} productId - productId
 * @property {number} quantity - Product quantity
 */

/**@type {import("joi").Schema<ProductDTO>}}*/
const ProductCartSchema = Joi.object(
    {
        productId: Joi.number().required(),
        quantity: Joi.number().optional().min(1).default(0)
    }
)

module.exports = {
    ProductCartSchema
}