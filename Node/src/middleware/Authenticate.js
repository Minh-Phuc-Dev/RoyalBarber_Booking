const { AsyncLocalStorage } = require('node:async_hooks');
const { verify, decode } = require("jsonwebtoken");
const { ExceptionBuilder } = require("src/exceptions/ExceptionBuilder");
const { HTTP_CODE } = require("src/helpers/HttpStatus");
const { USER_ROLES } = require('@enums/index');

const JWT_SECRET = process.env.JWT_SECRET

const AuthenticateContext = new AsyncLocalStorage();

/**
 *
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

const authenticate = (request, response, next) => {
    // Get token from Authorization header (Bearer token)
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        response.status(HTTP_CODE.UNAUTHORIZED).json(
            ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                'Access token required'
            )
        )
        return
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        const { sub } = decoded;

        AuthenticateContext.run(
            { id: sub },
            next
        );
    } catch (error) {
        response.status(HTTP_CODE.UNAUTHORIZED).json(
            ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                'Invalid or expired token'
            )
        )
    }
}

const adminAuthorize = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        response.status(HTTP_CODE.UNAUTHORIZED).json(
            ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                'Access token required'
            )
        )
        return
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        const { role } = decoded;
        if (role !== USER_ROLES.ADMIN) {
            response.status(HTTP_CODE.FORBIDDEN).json(
                ExceptionBuilder.builder(
                    HTTP_CODE.FORBIDDEN,
                    HTTP_CODE.FORBIDDEN,
                    'Admin access required'
                )
            )
            return
        }
        next();
    } catch (error) {
        response.status(HTTP_CODE.UNAUTHORIZED).json(
            ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                'Invalid or expired token'
            )
        )
    }
}

module.exports = {
    authenticate,
    adminAuthorize,
    AuthenticateContext
}
