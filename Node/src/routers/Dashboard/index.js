const { wrapperAsyncHandler } = require("src/helpers/ErrorWrapper");
const { DashboardController } = require("@controllers/DashboardController");
const { adminAuthorize, authenticate } = require("@middleware/Authenticate");
const router = require('express').Router()

router.get(
    "/dashboard",
    authenticate,
    adminAuthorize,
    wrapperAsyncHandler(DashboardController.getStatistics)
)

router.get(
    "/dashboard/customers",
    authenticate,
    adminAuthorize,
    wrapperAsyncHandler(DashboardController.getCustomers)
)


router.get(
    "/settings",
    wrapperAsyncHandler(DashboardController.getSettings)
)

router.put(
    "/settings",
    wrapperAsyncHandler(DashboardController.setSettings)
)


module.exports = router;
