const { Service } = require("src/models/Service/ServiceModel");
const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("src/helpers/HttpStatus");
const { ExceptionBuilder } = require("src/exceptions/ExceptionBuilder");

class ServiceService {
    static async getServices() {
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await Service.findAll(),
            HTTP_REASON.OK
        )
    }


    static async createService(payload) {
        const service = await Service.create(payload)
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            service,
            HTTP_REASON.CREATED
        )
    }

    static async updateService(id, { name, description, price, category, duration, image, status }) {
        const service = await Service.findByPk(id);
        if (!service) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "Không tìm thấy dịch vụ."
            )
        }

        await service.update({ name, description, price, category, duration, image, status });
        await service.reload()
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            service,
            HTTP_REASON.OK
        )
    }

}

module.exports = { ServiceService };