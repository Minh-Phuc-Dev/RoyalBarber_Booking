const { wrapperAsyncHandler } = require("src/helpers/ErrorWrapper");
const { AuthenticateController } = require("src/controllers/AuthenticateController");
const { authenticate } = require("src/middleware/Authenticate");
const router = require('express').Router()

router.post(
    "/login",
    wrapperAsyncHandler(AuthenticateController.login)
)


router.get(
    "/me",
    authenticate,
    wrapperAsyncHandler(AuthenticateController.getProfile)
)

router.post(
    "/register",
    wrapperAsyncHandler(AuthenticateController.register)
)

router.post(
    "/change-password",
    authenticate,
    wrapperAsyncHandler(AuthenticateController.changePassword)
)

router.post(
    "/change-display-name",
    authenticate,
    wrapperAsyncHandler(AuthenticateController.changeDisplayName)
)

router.post(
    "/forgot-password",
    wrapperAsyncHandler(AuthenticateController.forgotPassword)
)

router.post(
    "/reset-password",
    wrapperAsyncHandler(AuthenticateController.resetPassword)
)

module.exports = router;
