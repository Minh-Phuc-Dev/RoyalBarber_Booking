const { wrapperAsyncHandler } = require("src/helpers/ErrorWrapper");
const { UserController } = require("src/controllers/UserController");
const { authenticate, adminAuthorize } = require("src/middleware/Authenticate");
const router = require('express').Router()

router.get(
    "/users",
    authenticate,
    wrapperAsyncHandler(UserController.getUsers)
)

router.post(
    "/users",
    authenticate,
    adminAuthorize,
    wrapperAsyncHandler(UserController.createUser)
)

router.put(
    "/users",
    authenticate,
    adminAuthorize,
    wrapperAsyncHandler(UserController.updateUser)
)

module.exports = router;
