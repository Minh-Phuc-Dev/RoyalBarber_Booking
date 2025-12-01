const { STRING, INTEGER, JSON, Model, DATE, BOOLEAN, DECIMAL } = require("sequelize");
const { Postgres } = require("src/databases/SequelizePostgres");

const MODEL = "Promotion";
const TABLE = "promotions";

/**
 * @typedef {Object} PromotionModel
 * @property {number} [id] - Promotion id
 * @property {string} title - Promotion title
 * @property {string} [description] - Promotion description
 * @property {number} value - Discount value
 * @property {string} code - Promotion code
 * @property {Date} startDate - Start date
 * @property {Date} endDate - End date
 * @property {number} [total] - Maximum usage
 * @property {number} [usage] - Current usage count
 * @property {string} status - Promotion status
 * @property {Date} [createdAt] - Promotion created at
 * @property {Date} [updatedAt] - Promotion updated at
 */

/**
 * @class Promotion
 * @extends Model<PromotionModel,PromotionModel>
 */
class Promotion extends Model { }

Promotion.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: STRING(255),
        },
        description: {
            type: STRING(500),
            allowNull: true,
        },
        value: {
            type: DECIMAL(10, 2),
        },
        code: {
            type: STRING(100),
            unique: true,
        },
        startDate: {
            type: DATE,
        },
        endDate: {
            type: DATE
        },
        total: {
            type: INTEGER,
            defaultValue: 100,
        },
        usage: {
            type: INTEGER,
            defaultValue: 0,
        },
        status: {
            type: STRING(50),
        },
        createdAt: {
            type: DATE,
            defaultValue: new Date(),
        },
        updatedAt: {
            type: DATE,
            defaultValue: new Date(),
        },
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres,
    }
);

module.exports = { Promotion };