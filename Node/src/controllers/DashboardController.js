const { DashboardService } = require("@services/DashboardService");


class DashboardController {

    /**
     * Get Services
     * @param request
     * @param response
     */
    static async getStatistics(request, response) {
        (await DashboardService.getStatistics(request.query.timeRange)).send(response)
    }

    /**
     * Get Reports
     * @param request
     * @param response
     */
    static async getReports(request, response) {
        (await DashboardService.getReports(request.query.timeRange)).send(response)
    }

    /**
     * Get Customers
     * @param request
     * @param response
     */
    static async getCustomers(request, response) {
        (await DashboardService.getCustomers()).send(response)
    }

    static async getSettings(request, response) {
        (await DashboardService.getSettings()).send(response)
    }

    static async setSettings(request, response) {
        (await DashboardService.updateSettings(request.body)).send(response)
    }

}

module.exports = { DashboardController };