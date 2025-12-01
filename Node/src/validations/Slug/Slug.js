const Joi = require("joi");

/**
 * @typedef {Object} SlugDTO
 * @property {string} slug - The slug value.
 */

/**@type {import("joi").Schema<SlugDTO>}}*/
const SlugSchema = Joi.object(
    {
        slug: Joi.string().required()
    }
)

module.exports = {
    SlugSchema
}