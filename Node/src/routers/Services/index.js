const {wrapperAsyncHandler} = require("src/helpers/ErrorWrapper");
const {ServiceController} = require("src/controllers/ServiceController");
const router = require('express').Router()

router.get(
    "/services",
    wrapperAsyncHandler(ServiceController.getServices)
)

router.post(
    "/services",
    wrapperAsyncHandler(ServiceController.createService)
)

router.put(
    "/services",
    wrapperAsyncHandler(ServiceController.updateService)
)

module.exports = router;
