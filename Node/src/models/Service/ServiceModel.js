const { STRING, INTEGER, JSON, Model, DECIMAL, BOOLEAN } = require("sequelize");
const { Postgres } = require("src/databases/SequelizePostgres");


const MODEL = "Service";
const TABLE = "services";


/**
 * @typedef {Object} ServiceModel
 * @property {number} [id] - Service id
 * @property {string} name - Service name
 * @property {string} [description] - Service description
 * @property {number} price - Service price
 * @property {string} [image] - Service image URL
 * @property {number} duration - Service duration in minutes
 * @property {string} category - Service category
 * @property {string} status - Service status (default: "ACTIVE")
 * @property {Object} [attributes] - Additional service attributes
 * @property {string} [createdAt] - Service created at
 * @property {string} [updatedAt] - Service updated at
 */

/**
 * @class Service
 * @extends Model<ServiceModel,ServiceModel>
 */
class Service extends Model { }

Service.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: STRING(100),
            allowNull: false,
        },
        description: {
            type: STRING(500),
            allowNull: true,
        },
        price: {
            type: DECIMAL(10, 2),
            allowNull: false,
        },
        duration: {
            type: INTEGER,
            allowNull: false,
        },
        category: {
            type: STRING(100),
            allowNull: false,
        },
        image: {
            type: STRING(255),
            allowNull: true,
            defaultValue: "/placeholder-image.png"
        },
        status: {
            type: STRING(50),
            allowNull: false,
            defaultValue: "ACTIVE"
        },
        attributes: {
            type: JSON,
            allowNull: true,
            defaultValue: {}
        },
        createdAt: {
            type: "TIMESTAMP",
            field: "created_at",
            defaultValue: Postgres.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: "TIMESTAMP",
            field: "updated_at",
            defaultValue: Postgres.literal("CURRENT_TIMESTAMP")
        }
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres
    }
);



module.exports = { Service };