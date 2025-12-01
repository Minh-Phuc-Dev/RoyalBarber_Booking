const { Sequelize } = require('sequelize')

function getTimeZoneOffset() {
    const date = new Date();
    const offsetMinutes = date.getTimezoneOffset(); // Lấy offset dạng phút
    const sign = offsetMinutes > 0 ? "-" : "+";
    const hours = Math.floor(Math.abs(offsetMinutes) / 60).toString().padStart(2, "0");
    const minutes = (Math.abs(offsetMinutes) % 60).toString().padStart(2, "0");

    return `${sign}${hours}:${minutes}`;
}


const Postgres = new Sequelize(
    {
        host: process.env.POSTGRES_HOST,
        port: 5432,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        dialect: "postgres",
        timezone: getTimeZoneOffset(), // Sử dụng hàm để lấy timezone
        logging: false,
        logQueryParameters: true,
        dialectOptions: process.env.POSTGRES_SSL === "true" ? {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        } : undefined
    }
)

module.exports = {
    Postgres
}