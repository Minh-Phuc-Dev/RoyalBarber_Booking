const joi = require("joi")

/**
 * @typedef {Object} LoginDTO
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**@type {import("joi").Schema<LoginDTO>}}*/
const LoginSchema = joi.object(
    {
        email: joi.string().email({tlds: false}).required(),
        password: joi.string().required()
    }
)

module.exports = {
    LoginSchema
}