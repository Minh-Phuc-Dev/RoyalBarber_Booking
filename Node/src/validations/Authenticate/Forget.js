const joi = require("joi")

/**
 * @typedef {Object} ForgetDTO
 * @property {string} email - User email
 */

/**@type {import("joi").Schema<ForgetDTO>}}*/
const ForgetSchema = joi.object(
    {
        email: joi.string().email({ tlds: false }).required(),
    }
)

/**
 * @typedef {Object} ResetPasswordDTO
 * @property {string} email - User email
 * @property {string} otp - One-time password for verification
 * @property {string} password - User password
 */

/**@type {import("joi").Schema<ForgetDTO>}}*/
const ResetPasswordSchema = joi.object(
    {
        email: joi.string().email({ tlds: false }).required(),
        otp: joi.string().required(),
        password: joi.string().required()
    }
)

module.exports = {
    ForgetSchema,
    ResetPasswordSchema
}