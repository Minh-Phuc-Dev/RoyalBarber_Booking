const { Service } = require("src/models/Service/ServiceModel");
const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("src/helpers/HttpStatus");
const { Op } = require("sequelize");
const { Promotion } = require("src/models/Promotion/PromotionModel");
const { PROMOTION_STATUS } = require("@enums/index");
const { ExceptionBuilder } = require("@exceptions/ExceptionBuilder");

class PromotionService {
    static async getPromotions() {

        // const now = new Date();
        const promotions = await Promotion.findAll(
            // {
            //     where: {
            //         startDate: { [Op.lte]: now },
            //         endDate: { [Op.gte]: now }
            //     },
            //     order: [['createdAt', 'DESC']]
            // }
        );
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            promotions,
            HTTP_REASON.OK
        )
    }

    static async getAvailablePromotions() {

        const now = new Date();
        const promotions = await Promotion.findAll(
            {
                where: {
                    startDate: { [Op.lte]: now },
                    endDate: { [Op.gte]: now },
                    status: PROMOTION_STATUS.ACTIVE
                },
                order: [['createdAt', 'DESC']]
            }
        );
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            promotions,
            HTTP_REASON.OK
        )
    }

    static async create(data) {
        const isExisting = await Promotion.findOne(
            {
                where: { code: data.code }
            }
        );
        if (isExisting) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.CONFLICT,
                `Promotion code ${data.code} already exists.`,
                HTTP_REASON.CONFLICT
            )
        }

        const promotion = await Promotion.create(data);
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            promotion,
            HTTP_REASON.CREATED
        )

    }

    static async update({ id, ...data }) {

        const promotion = await Promotion.findByPk(id);
        if (!promotion) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.NOT_FOUND,
                HTTP_CODE.NOT_FOUND,
                `Promotion with id ${data.id} not found.`,
                HTTP_REASON.NOT_FOUND
            )
        }
        await promotion.update(
            {
                ...data,
                updatedAt: new Date()
            }
        );
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            promotion,
            HTTP_REASON.OK
        )
    }
}

module.exports = { PromotionService };