const { STRING, INTEGER, DATE, Model } = require("sequelize");
const { Postgres } = require("@databases/SequelizePostgres");

const MODEL = "UserOTP";
const TABLE = "user_otps";

/**
 * @typedef {Object} UserOTPModal
 * @property {number} [id] - Product id
 * @property {number} userId - User id
 * @property {string} email - User email
 * @property {string} otp - OTP code
 * @property {Date} expiredAt - OTP expiration date
 */

/**
 * @class UserOTP
 * @extends Model<UserOTPModal, UserOTPModal>
 * @property {number} id - The unique identifier for the product.
 * @property {number} userId - The ID of the user associated with the OTP.
 * @property {string} email - The email address of the user.
 * @property {string} otp - The OTP code.
 * @property {Date} expiredAt - The expiration date and time of the OTP.
 */

class UserOTP extends Model { }

UserOTP.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: INTEGER,
            allowNull: false,
        },
        email: {
            type: STRING(255),
            allowNull: false,
        },
        otp: {
            type: STRING(6),
            allowNull: false,
        },
        expiredAt: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(Date.now() + 15 * 60 * 1000),
        },
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
        timestamps: false
    }
);

module.exports = { UserOTP };