const {Service} = require ("src/models/Service/ServiceModel");
const {JsonResult} = require ("src/helpers/JsonResult");
const {HTTP_CODE} = require ("src/helpers/HttpStatus");
const {ServiceService} = require ("src/services/ServiceService");


class ServiceController {
    
    /**
     * Get Services
     * @param request
     * @param response
     * @returns {Promise<JsonResult>}
     */
    static async getServices (request, response) {
        (await ServiceService.getServices ()).send (response)
    }
    
    /**
     * Create Service
     * @param request
     * @param response
     * @returns {Promise<JsonResult>}
     */
    static async createService (request, response) {
        (await ServiceService.createService (request.body)).send (response)
    }
    
    /**
     * Update Service
     * @param request
     * @param response
     * @returns {Promise<JsonResult>}
     */
    static async updateService (request, response) {
        (await ServiceService.updateService(request.body.id, request.body)).send(response)
    }
}

module.exports = {ServiceController};