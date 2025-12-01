const {HTTP_CODE, HTTP_REASON} = require("src/helpers/HttpStatus");


class ExceptionBuilder extends Error {

    /**
     * Creates a new instance of a json response.
     *
     * @param {number} httpStatus - The HTTP status code of the response.
     * @param {string | number} code - The custom response code.
     * @param {string} message - A message describing the response.
     * @param {any} payload - The payload data associated with the response.
     * @param {any} meta - Additional metadata for the response.
     * @param {any} [stack] - Additional metadata for the response.
     */
    constructor(httpStatus, code, message, payload, meta, stack) {
        super(message)
        this.stack = stack
        this.error = true
        this.success = false
        this.code = code
        this.httpStatus = httpStatus
        this.message = message
        this.payload = payload
        this.meta = meta
    }

    /**
     * Creates a new ServiceException.
     *
     * @param {number} httpStatus - The HTTP status code of the response.
     * @param {string | number} code - The custom response code.
     * @param {string} message - A message describing the response.
     * @param {any} meta - Additional metadata for the response.
     * @param {any} payload - The payload data associated with the response.
     * @param {any} [stack] - Additional metadata for the response.
     * @returns {ExceptionBuilder} The newly created Exception object.
     */
    static builder(httpStatus = HTTP_CODE.INTERNAL_SERVER_ERROR, code = HTTP_CODE.INTERNAL_SERVER_ERROR, message = HTTP_REASON.INTERNAL_SERVER_ERROR, payload, meta, stack) {
        return new ExceptionBuilder(httpStatus, code, message, payload, meta, stack)
    }

    /**
     * Creates a new ServiceException.
     *
     * @param {any} payload - The payload data associated with the response.
     * @returns {ExceptionBuilder} The newly created Exception object.
     */
    static badRequest(payload) {
        return new ExceptionBuilder(
            HTTP_CODE.BAD_REQUEST,
            HTTP_CODE.BAD_REQUEST,
            HTTP_REASON.BAD_REQUEST,
            payload,
            null,
            null
        )
    }

}

module.exports = {ExceptionBuilder}