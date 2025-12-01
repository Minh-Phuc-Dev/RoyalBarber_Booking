import api, { requestApiHelper } from "@src/apis/index.js";


class UserService {

    static getUsers() {
        return requestApiHelper(
            api.get(
                "users"
            )
        )
    }

    static createUser(data) {
        return requestApiHelper(
            api.post(
                "users",
                data
            )
        )
    }

    static updateUser(data) {
        return requestApiHelper(
            api.put(
                "users",
                data
            )
        )
    }
}

export default UserService;