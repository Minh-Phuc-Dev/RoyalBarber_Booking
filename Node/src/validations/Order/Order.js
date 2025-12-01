const Joi = require("joi");

/**
 * @typedef {Object} OrderDTO
 * @property {string} paymentMethod - The payment method of the order.
 * @property {Object} attributes
 * @property {string} attributes.firstName - The first name of the user.
 * @property {string} attributes.lastName - The last name of the user.
 * @property {string} attributes.streetAddress - The street address of the user.
 * @property {string} attributes.phoneNumber - The phone number of the user.
 * @property {string} attributes.emailAddress - The email address of the user.
 * @property {string[]} products - List of product IDs.
 */

/**@type {import("joi").Schema<ProductDTO>}}*/
const OrderSchema = Joi.object(
    {
        paymentMethod: Joi.string().required().messages({
            'string.empty': 'Payment Method is required'
        }),
        attributes: {
            firstName: Joi.string().required().messages(
                {
                    'string.empty': 'First Name is required'
                }
            ),
            lastName: Joi.string().required().messages(
                {
                    'string.empty': 'Last Name is required'
                }
            ),
            streetAddress: Joi.string().required().messages(
                {
                    'string.empty': 'Street Address is required'
                }
            ),
            phoneNumber: Joi.string().required().messages(
                {
                    'string.empty': 'Phone Number is required'
                }
            ),
            emailAddress: Joi.string().email({tlds: false}).required().messages(
                {
                    'string.empty': 'Email Address is required',
                    'string.email': 'Please enter a valid email address'
                }
            ),
        },
        products: Joi.array().items(
            Joi.number()
        ).min(1).required().messages(
            {
                'array.min': 'At least one product is required'
            }
        )
    }
)

module.exports = {
    OrderSchema
}