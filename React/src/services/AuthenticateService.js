
import apis, { requestApiHelper } from "@src/apis/index.js";

class AuthenticateService {
    static getProfile() {
        return requestApiHelper(
            apis.get("/me")
        )
    }

    static login(body) {
        return requestApiHelper(
            apis.post("/login", body)
        )
    }

    static register(body) {
        return requestApiHelper(
            apis.post("/register", body)
        )
    }

    static forgot(body) {
        return requestApiHelper(
            apis.post("/forgot-password", body)
        )
    }

    static reset(body) {
        return requestApiHelper(
            apis.post("/reset-password", body)
        )
    }
}

export default AuthenticateService;