const { Postgres } = require("@databases/SequelizePostgres");
const { STRING, INTEGER, JSON, Model } = require("sequelize");

const { USER_STATUS } = require("src/enums");

const MODEL = "User";
const TABLE = "users";

/**
 * @typedef {Object} UserModel
 * @property {number} [id] - User id
 * @property {string} password - User password
 * @property {string} email - User email
 * @property {string} role - User role
 * @property {string} status - User status
 * @property {string} displayName - User display name
 * @property {Object} attributes - User attributes
 * @property {Object} meta - User meta
 * @property {string} [createdAt] - User created at
 * @property {string} [updatedAt] - User updated at
 */

/**
 * @class User
 * @extends Model<UserModel,UserModel>
 * @property {number} [id] - User id
 * @property {string} password - User password
 * @property {string} email - User email
 * @property {string} role - User role
 * @property {string} status - User status
 * @property {string} displayName - User display name
 * @property {Object} attributes - User attributes
 * @property {Object} meta - User meta
 * @property {string} [createdAt] - User created at
 * @property {string} [updatedAt] - User updated at
 */
class User extends Model { }

User.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: STRING(255),
            allowNull: false,
        },
        role: {
            type: STRING(50),
            allowNull: false,
        },
        displayName: {
            type: STRING(100),
            allowNull: false,
            field: "display_name",
        },
        status: {
            type: STRING(50),
            allowNull: false,
            defaultValue: USER_STATUS.ACTIVE,
        },
        attributes: {
            type: JSON,
            allowNull: true,
            defaultValue: {
                avatar: "/placeholder-avatar.png"
            },
        },
        meta: {
            type: JSON,
            allowNull: true,
            defaultValue: {},
        },
        createdAt: {
            type: "TIMESTAMP",
            field: "created_at",
            defaultValue: Postgres.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: "TIMESTAMP",
            field: "updated_at",
            defaultValue: Postgres.literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = { User };