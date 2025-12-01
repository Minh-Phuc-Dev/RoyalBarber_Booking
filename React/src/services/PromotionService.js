
import apis, { requestApiHelper } from "@src/apis/index.js";

class PromotionService {
    static getPromotions() {
        return requestApiHelper(
            apis.get("/promotions")
        )
    }

    static createPromotion(data) {
        return requestApiHelper(
            apis.post("/promotions", data)
        )
    }

    static updatePromotion(data) {
        return requestApiHelper(
            apis.put("/promotions", data)
        )
    }

    static getAvailablePromotions() {
        return requestApiHelper(
            apis.get("/promotions/available")
        )
    }
}

export default PromotionService;