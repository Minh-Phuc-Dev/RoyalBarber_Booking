const { JsonResult } = require("src/helpers/JsonResult");
const { AuthenticateService } = require("src/services/AuthenticateService");
const { AuthenticateContext } = require("src/middleware/Authenticate");


class AuthenticateController {

    /**
     * Login
     * @param {Request} request
     * @param {Response}  response

     */
    static async login(request, response) {

        const { password, email, role } = request.body;
        (await AuthenticateService.login({ password, email, role })).send(response)
    }

    /**
     * Get Profile
     * @param {Request} request
     * @param {Response}  response

     */
    static async getProfile(request, response) {
        const { id } = AuthenticateContext.getStore();
        (await AuthenticateService.getProfile(id)).send(response)
    }

    /**
     * Register
     * @param {Request} request
     * @param {Response}  response
     */
    static async register(request, response) {

        const { password, email, displayName } = request.body;
        (await AuthenticateService.register({ password, email, displayName })).send(response)
    }

    /**
     * Change Password
     * @param {Request} request
     * @param {Response}  response
     */
    static async changePassword(request, response) {
        const { id } = AuthenticateContext.getStore();
        const { password, newPassword } = request.body;
        (await AuthenticateService.changePassword({ id, password, newPassword })).send(response)
    }
    /**
    * Change Display Name
    * @param {Request} request
    * @param {Response}  response
    */
    static async changeDisplayName(request, response) {
        const { id } = AuthenticateContext.getStore();
        const { displayName } = request.body;
        (await AuthenticateService.changeDisplayName({ id, displayName })).send(response)
    }

    /**
     * Forgot Password
     * @param {Request} request
     * @param {Response}  response
     */
    static async forgotPassword(request, response) {

        (await AuthenticateService.forgot(request.body)).send(response)
    }

    /**
     * Reset Password
     * @param {Request} request
     * @param {Response}  response
     */
    static async resetPassword(request, response) {
        (await AuthenticateService.resetPassword(request.body)).send(response)
    }

}

module.exports = { AuthenticateController };