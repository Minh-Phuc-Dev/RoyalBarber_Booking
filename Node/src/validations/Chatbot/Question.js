const joi = require("joi")

/**
 * @typedef {Object} QuestionDTO
 * @property {string} question - User question
 */

/**@type {import("joi").Schema<QuestionDTO>}}*/
const QuestionSchema = joi.object(
    {
        question: joi.string()
    }
)

module.exports = {
    QuestionSchema
}