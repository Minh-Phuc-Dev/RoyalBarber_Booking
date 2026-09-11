import api, { requestApiHelper } from "@src/apis/index.js";


class ServiceService {

    static createService(body) {
        return requestApiHelper(
            api.post(
                "services",
                body,
            )
        )
    }

    static updateService(body) {
        return requestApiHelper(
            api.put(
                "services",
                body,
            )
        )
    }

    static getServices() {
        return requestApiHelper(
            api.get(
                "services",
            )
        )
    }

}

export default ServiceService;