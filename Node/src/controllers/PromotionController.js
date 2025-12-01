const { Service } = require("src/models/Service/ServiceModel");
const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE } = require("src/helpers/HttpStatus");
const { ServiceService } = require("src/services/ServiceService");
const { PromotionService } = require("src/services/PromotionService");


class PromotionController {

    /**
     * Get promotions
     * @param request
     * @param response
     */
    static async getPromotions(request, response) {
        (await PromotionService.getPromotions()).send(response)
    }

    /**
     * Create promotion
     * @param request
     * @param response
     */
    static async createPromotion(request, response) {
        (await PromotionService.create(request.body)).send(response);
    }

    /**
     * Update promotion
     * @param request
     * @param response
     */
    static async updatePromotion(request, response) {
        (await PromotionService.update(request.body)).send(response);
    }

    /**
     * Get available promotions
     * @param {*} request 
     * @param {*} response 
     */
    static async getAvailablePromotions(request, response) {
        (await PromotionService.getAvailablePromotions()).send(response)
    }
}

module.exports = { PromotionController };