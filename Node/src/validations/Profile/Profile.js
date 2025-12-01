const joi = require("joi")

/**
 * @typedef {Object} ProfileDTO
 * @property {string} email 
 * @property {string} displayName
 * @property {string} phone 
 * @property {string} gender
 * @property {string} address
 */

/**@type {import("joi").Schema<ProfileDTO>}}*/
const ProfileSchema = joi.object(
    {
        email: joi.string().email({ tlds: false }).optional(),
        displayName: joi.string().required(),
        phone: joi.string().optional().allow(""),
        gender: joi.string().optional().allow(""),
        address: joi.string().optional().allow("")
    }
)

module.exports = {
    ProfileSchema,
}