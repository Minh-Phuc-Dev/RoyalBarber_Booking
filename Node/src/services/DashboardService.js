const { BOOKING_STATUS, USER_ROLES } = require("@enums/index");
const { HTTP_CODE, HTTP_REASON } = require("@helpers/HttpStatus");
const { JsonResult } = require("@helpers/JsonResult");
const { Booking } = require("@models/Booking/BookingModel");
const { Service } = require("@models/Service/ServiceModel");
const { User } = require("@models/User/UserModel");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");


class DashboardService {

    static async getReports(timeRange) {

        const monthly = new Date()
        monthly.setMonth(Math.max(monthly.getMonth() - 1, 0))

        const revenue = {
            total: await Booking.sum(
                "price",
                {
                    where: timeRange === "YEARLY" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_6_MONTH" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_3_MONTH" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "MONTHLY" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: monthly
                                }
                            }
                        ]
                    } : {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                                }
                            }
                        ]

                    }
                }
            ) ?? 0
        }

        const customer = {
            total: await User.count(
                {
                    distinct: true,
                    where: timeRange === "YEARLY" ? {
                        [Op.and]: [
                            {
                                role: USER_ROLES.CUSTOMER
                            },
                            {
                                createdAt: {
                                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_6_MONTH" ? {
                        [Op.and]: [
                            {
                                role: USER_ROLES.CUSTOMER
                            },
                            {
                                createdAt: {
                                    [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_3_MONTH" ? {
                        [Op.and]: [
                            {
                                role: USER_ROLES.CUSTOMER
                            },
                            {
                                createdAt: {
                                    [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "MONTHLY" ? {
                        [Op.and]: [
                            {
                                role: USER_ROLES.CUSTOMER
                            },
                            {
                                createdAt: {
                                    [Op.gte]: monthly
                                }
                            }

                        ]
                    } : {
                        [Op.and]: [
                            {
                                role: USER_ROLES.CUSTOMER
                            },
                            {
                                createdAt: {
                                    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                                }
                            }
                        ]

                    }
                }
            ) ?? 0
        }

        const bookingRate = (
            await Booking.findAll(
                {
                    where: timeRange === "YEARLY" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_6_MONTH" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "LATEST_3_MONTH" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    } : timeRange === "MONTHLY" ? {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: monthly
                                }
                            }
                        ]
                    } : {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                                }
                            }
                        ]
                    }
                }
            )
        ).filter(
            booking => booking.getDataValue("meta")?.rating !== undefined
        )

        const rate = {
            total: bookingRate.length ? bookingRate.reduce(
                (total, booking) => total + Number(booking.getDataValue("meta").rating),
                0
            ) / bookingRate.length : 0,
            top: bookingRate.length ? bookingRate.sort(
                (a, b) => a.getDataValue("meta")?.rating - b.getDataValue("meta")?.rating
            ).slice(0, 5) : []
        }



        const items = await Booking.findAll(
            {
                where: timeRange === "YEARLY" ? {
                    date: {
                        [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                    }
                } : timeRange === "LATEST_6_MONTH" ? {
                    date: {
                        [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                    }
                } : timeRange === "LATEST_3_MONTH" ? {
                    date: {
                        [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                    }
                } : timeRange === "MONTHLY" ? {
                    date: {
                        [Op.gte]: monthly
                    }
                } : {
                    date: {
                        [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    }
                }
            }
        )

        const bookingStatus = items.reduce(
            (values, booking) => {
                values[booking.getDataValue("status")] += 1
                return values
            },
            {
                [BOOKING_STATUS.CANCELLED]: 0,
                [BOOKING_STATUS.COMPLETED]: 0,
                [BOOKING_STATUS.PENDING]: 0,
                [BOOKING_STATUS.SUCCESS]: 0
            }
        )




        const booking = {
            total: await Booking.count(
                {
                    where: timeRange === "YEARLY" ? (
                        {
                            date: {
                                [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                            }
                        }
                    ) : timeRange === "LATEST_6_MONTH" ? {
                        date: {
                            [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                        }
                    } : timeRange === "LATEST_3_MONTH" ? {
                        date: {
                            [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                        }
                    } : timeRange === "MONTHLY" ? {
                        date: {
                            [Op.gte]: monthly
                        }
                    } : {
                        date: {
                            [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                        }
                    }
                }
            ) ?? 0
        }

        const revenueCharts = (
            await Booking.findAll(
                {
                    attributes: [
                        [
                            Booking.sequelize.fn('DATE', Booking.sequelize.col('date')),
                            'date'
                        ],
                        [
                            Booking.sequelize.fn('SUM', Booking.sequelize.col('price')),
                            'totalRevenue'
                        ]
                    ],
                    where: timeRange === "YEARLY" ? {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                        }

                    } : timeRange === "LATEST_6_MONTH" ? {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                        }
                    } : timeRange === "LATEST_3_MONTH" ? {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                        }
                    } : timeRange === "MONTHLY" ? {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: monthly
                        }
                    } : {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                        }
                    },
                    group: [Booking.sequelize.fn('DATE', Booking.sequelize.col('date'))],
                    order: [[Booking.sequelize.fn('DATE', Booking.sequelize.col('date')), 'ASC']]
                }
            )
        ).map(
            row => {
                const dateValues = row.get('date')?.split('-');

                return {
                    label: `${dateValues[2]}/${dateValues[1]}`,
                    value: Number(row.get('totalRevenue'))
                }
            }
        )

        const lastBooking = await Booking.findAll(
            {
                limit: 5,
                order: [["createdAt", "DESC"]],
                where: { status: BOOKING_STATUS.SUCCESS },
            }
        )

        const bookings = await Booking.findAll(
            {
                attributes: [
                    'serviceId',
                    [Booking.sequelize.fn('COUNT', Booking.sequelize.col('id')), 'bookingCount'],
                    [Booking.sequelize.fn('SUM', Booking.sequelize.col('price')), 'totalRevenue']
                ],
                where: timeRange === "YEARLY" ? {
                    status: BOOKING_STATUS.COMPLETED,
                    date: {
                        [Op.gte]: new Date(new Date().getFullYear(), 0, 1)
                    }
                } : timeRange === "LATEST_6_MONTH" ? {
                    status: BOOKING_STATUS.COMPLETED,
                    date: {
                        [Op.gte]: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
                    }
                } : timeRange === "LATEST_3_MONTH" ? {
                    status: BOOKING_STATUS.COMPLETED,
                    date: {
                        [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                    }
                } : timeRange === "MONTHLY" ? {
                    status: BOOKING_STATUS.COMPLETED,
                    date: {
                        [Op.gte]: monthly
                    }
                } : {
                    status: BOOKING_STATUS.COMPLETED,
                    date: {
                        [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    }
                },
                group: ['service_id'],
                order: [[Booking.sequelize.fn('COUNT', Booking.sequelize.col('id')), 'DESC']]
            }
        );

        let revenueByService = [];

        for (const record of bookings) {


            const service = await Service.findByPk(record.getDataValue('serviceId'));
            if (service) {
                revenueByService.push({
                    label: service.getDataValue('name'),
                    value: Number(record.getDataValue('totalRevenue')),
                    image: service.getDataValue('image'),
                    count: Number(record.getDataValue('bookingCount'))
                });
            }
        }

        const bookingCharts = []

        for (const item of bookings) {
            const service = await Service.findByPk(item.getDataValue('serviceId'));
            if (service) {
                bookingCharts.push({
                    label: service.getDataValue('name'),
                    value: Number(item.getDataValue('bookingCount'))
                });
            }
        }


        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            {
                revenue,
                customer,
                booking,
                rate,
                revenueCharts,
                bookingCharts,
                lastBooking,
                revenueByService,
                bookingStatus
            },
            "Statistics fetched successfully"
        )



    }

    static async getStatistics(timeRange) {

        const revenue = {
            total: await Booking.sum(
                "price",
                {
                    where: {
                        [Op.and]: [
                            {
                                status: BOOKING_STATUS.COMPLETED
                            },
                            {
                                date: {
                                    [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                                }
                            }
                        ]

                    }
                }
            ),
        }

        const booking = {
            total: await Booking.count(
                {
                    where: {
                        date: {
                            [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                        },
                        status: BOOKING_STATUS.COMPLETED

                    }
                }
            )
        }

        const customer = {
            total: await User.count(
                {
                    distinct: true,
                    where: {
                        role: USER_ROLES.CUSTOMER,
                        createdAt: {
                            [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                        }
                    },
                }
            ),
            change: Math.floor(Math.random() * 101)
        }

        const bookingRates = (
            await Booking.findAll(
                {
                    where: {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                        }
                    },

                }
            )
        ).filter(
            booking => booking.getDataValue("meta")?.rating !== undefined
        )

        const rate = {
            total: bookingRates.length ? bookingRates.reduce(
                (total, booking) => total + Number(booking.getDataValue("meta").rating),
                0
            ) / bookingRates.length : 0,
            value: bookingRates.length
        }

        const revenueCharts = (
            await Booking.findAll(
                {
                    attributes: [
                        [
                            // Format date as YYYY-MM-DD
                            Booking.sequelize.fn('DATE', Booking.sequelize.col('date')),
                            'date'
                        ],
                        [
                            Booking.sequelize.fn('SUM', Booking.sequelize.col('price')),
                            'totalRevenue'
                        ]
                    ],
                    where: {
                        status: BOOKING_STATUS.COMPLETED,
                        date: {
                            [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                        }
                    },
                    group: [Booking.sequelize.fn('DATE', Booking.sequelize.col('date'))],
                    order: [[Booking.sequelize.fn('DATE', Booking.sequelize.col('date')), 'ASC']]
                }
            )
        ).map(
            row => {
                const dateValues = row.get('date')?.split('-');

                return {
                    label: `${dateValues[2]}/${dateValues[1]}`,
                    value: Number(row.get('totalRevenue'))
                }
            }
        )


        const lastBooking = await Booking.findAll(
            {
                limit: 5,
                order: [["createdAt", "DESC"]],
                where: { status: BOOKING_STATUS.SUCCESS },
            }
        )

        const bookings = await Booking.findAll({
            attributes: [
                'serviceId',
                [Booking.sequelize.fn('COUNT', Booking.sequelize.col('id')), 'bookingCount'],
                [Booking.sequelize.fn('SUM', Booking.sequelize.col('price')), 'totalRevenue']
            ],
            where: {
                status: BOOKING_STATUS.COMPLETED,
                date: {
                    [Op.gte]: new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000)
                }
            },
            group: ['service_id'],
            order: [[Booking.sequelize.fn('COUNT', Booking.sequelize.col('id')), 'DESC']]
        });

        let revenueByService = [];

        for (const record of bookings) {


            const service = await Service.findByPk(record.getDataValue('serviceId'));
            if (service) {
                revenueByService.push({
                    label: service.getDataValue('name'),
                    value: Number(record.getDataValue('totalRevenue')),
                    image: service.getDataValue('image'),
                    count: Number(record.getDataValue('bookingCount'))
                });
            }
        }

        const bookingCharts = []

        for (const item of bookings) {
            const service = await Service.findByPk(item.getDataValue('serviceId'));
            if (service) {
                bookingCharts.push({
                    label: service.getDataValue('name'),
                    value: Number(item.getDataValue('bookingCount'))
                });
            }
        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            {
                revenue,
                customer,
                booking,
                rate,
                revenueCharts,
                bookingCharts,
                lastBooking,
                revenueByService
            },
            "Statistics fetched successfully"
        )
    }

    static async getCustomers() {

        const customers = (
            await User.findAll(
                {
                    where: {
                        role: USER_ROLES.CUSTOMER
                    },
                    attributes: {
                        exclude: ["password"]
                    },
                    limit: 5,
                    order: [["createdAt", "DESC"]]
                }
            )
        ).map(
            customer => customer.toJSON()
        )

        const results = []

        for (const customer of customers) {
            const bookings = await Booking.findAll(
                {
                    where: {
                        customerId: customer.id
                    }
                }
            )

            const rateBookings = bookings.filter(
                booking => typeof booking.getDataValue("meta")?.rating === "number"
            )

            results.push(
                Object.assign(
                    customer,
                    {
                        totalBookings: bookings.length,
                        totalSpent: bookings.reduce(
                            (total, booking) => total + Number(booking.getDataValue("price")),
                            0
                        ),
                        rate: rateBookings.length ? rateBookings.reduce(
                            (total, booking) => total + Number(booking.getDataValue("meta").rating),
                            0
                        ) / rateBookings.length : 0
                    }
                )
            )


        }
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            results,
            HTTP_REASON.OK
        )

    }


    static async getSettings() {
        const settingsPath = path.join(process.cwd(), 'settings.json');

        if (fs.existsSync(settingsPath)) {
            const data = fs.readFileSync(settingsPath, 'utf-8');
            const settings = JSON.parse(data);
            return JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.OK,
                settings,
                "Settings fetched successfully"
            );
        }
        const settings = {
            title: "Royal Barber",
            address: "123 Nguyễn Văn Linh, Q.7, TP.HCM",
            phone: "0347 206 121",
            email: "info@royalbarber.com",
            weekdays: "06:00-21:00",
            weekend: "09:00-20:00",
            maintenanceMode: false
        }

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf-8');

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            settings,
            "Settings fetched successfully"
        );

    }

    static async updateSettings(settings) {
        const settingsPath = path.join(process.cwd(), 'settings.json');

        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf-8');
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            settings,
            "Settings updated successfully"
        );
    }


}

module.exports = { DashboardService };