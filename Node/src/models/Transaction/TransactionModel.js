const { STRING, INTEGER, JSON, Model, DECIMAL, BOOLEAN } = require("sequelize");
const { Postgres } = require("src/databases/SequelizePostgres");


const MODEL = "Transaction";
const TABLE = "transactions";


/**
 * @typedef {Object} TransactionModel
 * @property {number} [id] - Transaction id
 * @property {number} bookingId - Related booking id
 * @property {number} amount - Transaction amount
 * @property {string} provider - Payment provider
 * @property {string} status - Transaction status
 * @property {Date} [transactionDate] - Date of transaction
 * @property {Object} [meta] - Additional transaction metadata
 */

/**
 * @class Transaction
 * @extends Model<TransactionModel,TransactionModel>
 */
class Transaction extends Model { }

Transaction.init(
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookingId: {
            type: INTEGER,
            allowNull: false,

        },
        amount: {
            type: DECIMAL,
            allowNull: false,
        },
        provider: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: STRING,
            allowNull: false,
        },
        transactionDate: {
            type: "TIMESTAMP",
            allowNull: true,
            defaultValue: new Date(),
        },
        meta: {
            type: JSON,
            allowNull: true,
            defaultValue: {}
        }
    },
    {
        tableName: TABLE,
        modelName: MODEL,
        underscored: true,
        sequelize: Postgres
    }
);



module.exports = { Transaction };