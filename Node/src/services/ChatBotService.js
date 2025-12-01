const { SERVICE_STATUS, PROMOTION_STATUS } = require("@enums/index");
const { HTTP_CODE } = require("@helpers/HttpStatus");
const { JsonResult } = require("@helpers/JsonResult");
const { Promotion } = require("@models/Promotion/PromotionModel");
const { Service } = require("@models/Service/ServiceModel");
const OpenAI = require("openai");
const { Op } = require("sequelize");



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

        const systemPrompts = [
            "Bạn là một trợ lý ảo cho tiệm cắt tóc Royal Barber chuyên nghiệp tại Việt Nam.",
            "Thông tin ngữ cảnh về các dịch vụ của tiệm: ",
            ...services,
            promotions.length > 0 ? "Thông tin ngữ cảnh về các chương trình khuyến mãi hiện có: " : "",
            ...promotions,
            "Hãy trả lời các câu hỏi của khách hàng một cách ngắn gọn, súc tích và thân thiện, sử dụng markdown để định dạng nếu cần thiết.",
            "Sử dụng tiếng Việt trong tất cả các phản hồi."
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
