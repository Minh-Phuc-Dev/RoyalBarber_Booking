const { ChatBotService } = require("@services/ChatBotService")

class ChatbotController {

    /**
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     */
    static async chat(request, response) {
        (await ChatBotService.chat(request.body.question)).send(response)
    }


}

module.exports = {
    ChatbotController
}