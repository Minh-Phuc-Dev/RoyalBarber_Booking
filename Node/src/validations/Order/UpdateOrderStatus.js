const Joi = require("joi");

/**
 * @typedef {Object} UpdateOrderSttausDTO
 * @property {number} id - The ID of the order.
 * @property {string} status - The status of the order.
 */

/**@type {import("joi").Schema<UpdateOrderSttausDTO>}}*/
const UpdateOrderSchema = Joi.object(
    {
        id: Joi.number().required().messages(
            {
                'number.empty': 'Order ID is required'
            }
        ),
        status: Joi.string().required().messages(
            {
                'string.empty': 'Status is required'
            }
        )
    }
)

module.exports = {
    UpdateOrderSchema
}