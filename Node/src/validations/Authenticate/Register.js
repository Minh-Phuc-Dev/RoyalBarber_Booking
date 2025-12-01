const joi = require("joi")

/**
 * @typedef {Object} RegisterDTO
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} displayName - User display name
 */

/**@type {import("joi").Schema<RegisterDTO>}}*/
const RegisterSchema = joi.object(
    {
        email: joi.string().email({tlds: false}).required(),
        password: joi.string().required(),
        displayName: joi.string().required()
    }
)

module.exports = {
    RegisterSchema
}