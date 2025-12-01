const Joi = require("joi");

/**
 * @typedef {Object} CategoryDTO
 * @property {number} [id] - Category id.
 * @property {string} name - Category name.
 * @property {Object} attributes - Category attributes.
 * @property {Object} meta - Category meta.
 */

/**@type {import("joi").Schema<CategoryDTO>}}*/
const CategorySchema = Joi.object(
    {
        id: Joi.number().optional(),
        name: Joi.string().required(),
        attributes: Joi.object().optional(),
        meta: Joi.object().optional()
    }
)

module.exports = {
    CategorySchema
}