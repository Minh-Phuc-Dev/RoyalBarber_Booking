import api, { requestApiHelper } from "@src/apis/index.js";


class ChatbotService {

    static chat(question) {
        return requestApiHelper(
            api.post(
                "chatbot",
                {
                    question
                }
            )
        )
    }
}

export default ChatbotService;