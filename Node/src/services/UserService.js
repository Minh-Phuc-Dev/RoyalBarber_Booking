const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("src/helpers/HttpStatus");
const { User } = require("src/models/User/UserModel");
const { AuthenticateContext } = require("src/middleware/Authenticate");
const { Op } = require("sequelize");
const { ExceptionBuilder } = require("src/exceptions/ExceptionBuilder");
const bcrypt = require("bcryptjs");


class UserService {

    static async getUsers() {

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await User.findAll(
                {
                    attributes: { exclude: ['password'] },
                    where: {
                        [Op.not]: {
                            id: AuthenticateContext.getStore().id
                        }
                    }
                }
            ),
            HTTP_REASON.OK
        )
    }


    static async createUser(payload) {
        let user = await User.findOne({ where: { email: payload.email } });

        if (user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.CONFLICT,
                "Email đã được sử dụng."
            )
        }

        user = (await User.create(
            {
                ...payload,
                password: bcrypt.hashSync(payload.password, 10),
                attributes: {
                    avatar: "/placeholder-avatar.png",
                    ...(payload.attributes ?? {})
                }
            }
        )).toJSON()
        delete user.password;

        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            user,
            HTTP_REASON.CREATED
        )
    }

    static async updateUser(payload) {
        const user = await User.findByPk(payload.id);
        if (!user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "Người dùng không tồn tại."
            )
        }

        await user.update(
            {
                ...payload,
                attributes: {
                    ...user.getDataValue("attributes"),
                    ...(payload.attributes ?? {})
                }
            }
        )
        await user.reload();
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            user.toJSON(),
            HTTP_REASON.OK
        )
    }
}

module.exports = { UserService };