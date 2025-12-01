const { wrapperAsyncHandler } = require("src/helpers/ErrorWrapper");
const { authenticate } = require("src/middleware/Authenticate");
const { PromotionController } = require("src/controllers/PromotionController");
const router = require('express').Router()


router.get(
    "/promotions/available",
    wrapperAsyncHandler(PromotionController.getAvailablePromotions)
)

router.get(
    "/promotions",
    wrapperAsyncHandler(PromotionController.getPromotions)
)

router.post(
    "/promotions",
    authenticate,
    wrapperAsyncHandler(PromotionController.createPromotion)
)

router.put(
    "/promotions",
    authenticate,
    wrapperAsyncHandler(PromotionController.updatePromotion)
)





module.exports = router;
