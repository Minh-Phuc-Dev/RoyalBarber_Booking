const { JsonResult } = require("src/helpers/JsonResult");
const { UserService } = require("src/services/UserService");


class UserController {

    /**
     * Get Users
     * @param {Request} request
     * @param {Response}  response
     */
    static async getUsers(request, response) {
        (await UserService.getUsers()).send(response)
    }

    /**
     * Create User
     * @param {Request} request
     * @param {Response}  response
     */
    static async createUser(request, response) {
        (await UserService.createUser(request.body)).send(response)
    }

    /**
     * Update User
     * @param {Request} request
     * @param {Response}  response
     */
    static async updateUser(request, response) {
        (await UserService.updateUser(request.body)).send(response)
    }

}

module.exports = { UserController };