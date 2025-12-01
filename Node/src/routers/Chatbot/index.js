const { ChatbotController } = require("@controllers/ChatbotController")
const { wrapperAsyncHandler } = require("@helpers/ErrorWrapper")

const router = require("express").Router()

router.post(
    "/chatbot",
    wrapperAsyncHandler(ChatbotController.chat)
)


module.exports = router