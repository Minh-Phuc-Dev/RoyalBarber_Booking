
const { AsyncLocalStorage } = require('node:async_hooks');
const {ExceptionBuilder} = require("src/exceptions/ExceptionBuilder");

/**
 * @param {Error} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

const errorHandle = (error, request, response, next) => {
    console.log(error);
    

    if (error instanceof ExceptionBuilder) {
        return response.status(typeof error.httpStatus === "number" ? error.httpStatus : 500).send(
            {
                ...error,
                message : error.message,
            }
        )
    }

    response.status(500).send(
        {
            message: "Internal Server Error",
            error: error.message,
        }
    )
}

module.exports = {
    errorHandle
}

