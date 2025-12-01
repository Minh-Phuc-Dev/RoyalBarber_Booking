const Joi = require("joi");

/**
 * @typedef {Object} ProductDTO
 * @property {number} [id] - Product id
 * @property {number} categoryId - Category id
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} [oldPrice] - Product old price
 * @property {string} [status] - Product status
 * @property {string} [sku] - Product SKU
 * @property {string} [description] - Product description
 * @property {number} quantity - Product quantity
 * @property {number} [rating] - Product rating
 * @property {Object} [attributes] - Product attributes
 * @property {Object} [meta] - Product meta
 * @property {Date} createdAt - Product created at
 * @property {Date} [updatedAt] - Product updated at
 */

/**@type {import("joi").Schema<ProductDTO>}}*/
const ProductSchema = Joi.object(
    {
        id: Joi.number().optional(),
        categoryId: Joi.number().required(),
        name: Joi.string().required().max(255),
        price: Joi.number().required().min(0),
        oldPrice: Joi.number().optional().min(0).default(0),
        status: Joi.string().optional(),
        sku: Joi.string().optional().max(50),
        description: Joi.string().optional(),
        quantity: Joi.number().required().min(0),
        rating: Joi.number().optional().min(0).max(5).default(5),
        attributes: Joi.object().optional().default(
            {}
        ),
        meta: Joi.object().optional().default(
            {}
        )
    }
)

module.exports = {
    ProductSchema
}