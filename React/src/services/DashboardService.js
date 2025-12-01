import api, { requestApiHelper } from "@src/apis/index.js";


class DashboardService {

    static getStatistics(params) {
        return requestApiHelper(
            api.get(
                "dashboard",
                {
                    params
                }
            )
        )
    }

    static getCustomers() {
        return requestApiHelper(
            api.get(
                "dashboard/customers"
            )
        )
    }

    static getSettings() {
        return requestApiHelper(
            api.get(
                "settings"
            )
        )
    }

    static updateSettings(data) {
        return requestApiHelper(
            api.put(
                "settings",
                data
            )
        )
    }
}

export default DashboardService;