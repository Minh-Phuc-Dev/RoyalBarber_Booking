const { STRING, INTEGER, JSON, Model, DATE, DECIMAL } = require("sequelize");
const { USER_STATUS } = require("src/enums");
const { Postgres } = require("src/databases/SequelizePostgres");

const MODEL = "Booking";
const TABLE = "bookings";

/**
 * @typedef {Object} BookingModel
 * @property {number} [id] - Booking id
 * @property {number} [staffId] - Staff id
 * @property {number} [customerId] - Customer id
 * @property {number} serviceId - Service id
 * @property {string} date - Booking date
 * @property {string} time - Booking time
 * @property {string} status - Booking status
 * @property {number} price - Booking price
 * @property {Object} meta - Booking meta
 * @property {string} [createdAt] - Booking created at
 * @property {string} [updatedAt] - Booking updated at
 * @property {string} [code] - Booking code
 * @property {string} [paymentMethod] - Payment method
 * @property {number} [promotionId] - Promotion id
 */

/**
 * @class Booking
 * @extends Model<BookingModel,BookingModel>
 * @property {number} [id] - Booking id
 * @property {number} [staffId] - Staff id
 * @property {number} [customerId] - Customer id
 * @property {number} serviceId - Service id
 * @property {string} date - Booking date
 * @property {string} time - Booking time
 * @property {string} status - Booking status
 * @property {number} price - Booking price
 * @property {Object} meta - Booking meta
 * @property {string} [createdAt] - Booking created at
 * @property {string} [updatedAt] - Booking updated at
 * @property {string} [code] - Booking code
 * @property {string} [paymentMethod] - Payment method
 * @property {number} [promotionId] - Promotion id
 */
class Booking extends Model { }

Booking.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: STRING(50),
            unique: true,
            allowNull: true,
        },
        staffId: {
            type: INTEGER,
            allowNull: true,
            field: "staff_id",
        },
        customerId: {
            type: INTEGER,
            allowNull: true,
            field: "customer_id",
        },
        serviceId: {
            type: INTEGER,
            allowNull: false,
            field: "service_id",
        },
        date: {
            type: DATE,
            allowNull: false,
        },
        time: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: STRING(50),
            allowNull: false,
            defaultValue: USER_STATUS.ACTIVE
        },
        paymentMethod: {
            type: STRING(50),
            allowNull: true,
            field: "payment_method",
        },
        promotionId: {
            type: INTEGER,
            allowNull: true,
            field: "promotion_id",
        },
        price: {
            type: DECIMAL(10, 2),
            allowNull: false,
        },
        meta: {
            type: JSON,
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            allowNull: true,
            defaultValue: require("sequelize").literal("CURRENT_TIMESTAMP"),
            field: "created_at",
        },
        updatedAt: {
            type: DATE,
            allowNull: true,
            field: "updated_at",
        }
    },
    {
        sequelize: Postgres,
        modelName: MODEL,
        tableName: TABLE,
        underscored: true,
    }
)

module.exports = { Booking };