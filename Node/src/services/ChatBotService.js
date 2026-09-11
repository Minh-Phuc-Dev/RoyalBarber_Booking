const { SERVICE_STATUS, PROMOTION_STATUS } = require("@enums/index");
const { HTTP_CODE } = require("@helpers/HttpStatus");
const { JsonResult } = require("@helpers/JsonResult");
const { Promotion } = require("@models/Promotion/PromotionModel");
const { Service } = require("@models/Service/ServiceModel");
const OpenAI = require("openai");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");



class ChatBotService {

    static #client = new OpenAI(
        {
            apiKey: process.env.OPENAI_API_KEY,
        }
    );

    /**
     * @param {string} question
     * @returns {Promise<JsonResult>}
     */

    static async chat(question) {

        const services = (
            await Service.findAll(
                {
                    where: {
                        status: SERVICE_STATUS.ACTIVE
                    }
                }
            )
        ).map(
            (service) => {
                const data = service.toJSON();
                return `- ${data.name}: ${data.description} (Giá: ${data.price} VND, Thời gian: ${data.duration} phút)`
            }
        );

        const promotions = (
            await Promotion.findAll(
                {
                    where: {
                        startDate: { [Op.lte]: new Date() },
                        endDate: { [Op.gte]: new Date() },
                        status: PROMOTION_STATUS.ACTIVE
                    },
                    order: [['createdAt', 'DESC']]
                }
            )
        ).map(
            (promotion) => {
                const data = promotion.toJSON();
                return `- ${data.title}: ${data.description} (Giá trị: ${data.value} VND, Mã: ${data.code}, HSD: ${data.endDate.toLocaleDateString()})`
            }
        )

        const settings = JSON.parse(
            fs.readFileSync(
                path.join(
                    process.cwd(),
                    "settings.json"
                ),
                { encoding: "utf-8" }
            )
        );


        const systemPrompts = [
            "Bạn là một trợ lý ảo cho tiệm cắt tóc Royal Barber chuyên nghiệp tại Việt Nam.",
            "Thông tin ngữ cảnh về các dịch vụ của tiệm: ",
            ...services,
            promotions.length > 0 ? "Thông tin ngữ cảnh về các chương trình khuyến mãi hiện có: " : "",
            ...promotions,
            `Thông tin ngữ cảnh về các kênh liên hệ của tiệm: ${JSON.stringify(settings)}`,
            "QUY TẮC BẮT BUỘC:",
            "- Nếu câu hỏi KHÔNG liên quan đến tiệm cắt tóc (ví dụ: giá vàng, giá đất, chứng khoán, thời tiết, chính trị…), hãy trả lời đúng mẫu sau:",
            "  'Xin lỗi, tôi là trợ lý của tiệm Royal Barber và không cung cấp thông tin về lĩnh vực này. Nếu bạn cần hỗ trợ về dịch vụ tại tiệm (bảng giá, khuyến mãi, dịch vụ...), tôi sẵn sàng giúp.'",
            "- Không suy đoán, không trả lời lan man.",
            "- Trả lời ngắn gọn, lịch sự, thân thiện.",
            "- Gợi ý mã giảm giá với dịch vụ nếu có thể.",
            "- Luôn sử dụng tiếng Việt."
        ].join("\n");


        const response = await this.#client.chat.completions.create({
            model: "gpt-5-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompts
                },
                {
                    role: "user",
                    content: question
                }
            ]
        })



        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            response.choices[0].message.content,
            "Chat successfully."
        )

    }
}

module.exports = { ChatBotService };
