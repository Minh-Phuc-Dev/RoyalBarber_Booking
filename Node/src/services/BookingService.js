const { Service } = require("src/models/Service/ServiceModel");
const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("src/helpers/HttpStatus");
const { User } = require("src/models/User/UserModel");
const { USER_STATUS, USER_ROLES, BOOKING_STATUS, PAYMENT_METHODS } = require("src/enums");
const { Booking } = require("src/models/Booking/BookingModel");
const { VNPayService } = require("@services/VNPayService");
const { Op } = require("sequelize");
const { Promotion } = require("@models/Promotion/PromotionModel");

class BookingService {


    static async getTakenSlots(params) {
        const { serviceId, staffId, date } = params;

        if (!serviceId || !staffId || !date) {
            return JsonResult.builder(
                HTTP_CODE.OK,
                HTTP_CODE.OK,
                [],
                HTTP_REASON.OK
            )
        }

        const bookings = await Booking.findAll(
            {
                where: {
                    serviceId,
                    staffId,
                    date,
                    status: BOOKING_STATUS.SUCCESS
                },
                attributes: ['time']
            }
        )

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            bookings.map(booking => booking.getDataValue('time')),
            HTTP_REASON.OK
        )
    }


    static async getAvailableStaff() {


        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            await User.findAll(
                {
                    where: {
                        role: USER_ROLES.STAFF,
                        status: USER_STATUS.ACTIVE
                    },
                    attributes: {
                        exclude: ["password"]
                    }
                }
            ),
            HTTP_REASON.OK
        )
    }

    static async completeBookingPayment(params) {
        const { vnp_TxnRef: bookingId } = params

        const booking = await Booking.findByPk(Number(bookingId))
        if (!booking) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                null,
                "Booking not found",
                params
            )
        }

        if (booking.getDataValue('status') === BOOKING_STATUS.PENDING) {
            booking.set('status', BOOKING_STATUS.SUCCESS)
            await booking.save()
        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            booking,
            HTTP_REASON.OK,
            params
        )
    }

    static async booking(body) {
        if (body?.meta?.voucher) {
            const promotion = await Promotion.findByPk(body.meta.voucher.id)

            promotion.set(
                "usage",
                promotion.getDataValue("usage") + 1
            )
            await promotion.save()

        }

        const booking = await Booking.create(
            {
                ...body,
                status: body.paymentMethod === PAYMENT_METHODS.CASH ? BOOKING_STATUS.SUCCESS : BOOKING_STATUS.PENDING
            }
        )


        if (body.paymentMethod === PAYMENT_METHODS.CASH) {
            return JsonResult.builder(
                HTTP_CODE.CREATED,
                HTTP_CODE.CREATED,
                booking,
                HTTP_REASON.CREATED
            )
        }

        const { url, params } = await VNPayService.generateUrl(body.price, booking.getDataValue('id'))
        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.TEMPORARY_REDIRECT,
            {
                url,
                params,
                booking

            },
            "Redirecting to payment gateway"
        )

    }

    static async getAll() {
        const bookings = await Booking.findAll()

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            bookings,
            HTTP_REASON.OK
        )
    }

    static async getByUserId(userId) {

        const bookings = await Booking.findAll(
            {
                where: { userId }
            }
        )
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            bookings,
            HTTP_REASON.OK
        )
    }


    static async setStatusBooking(body) {
        const { bookingId, status } = body;
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                null,
                "Booking not found"
            )
        }
        booking.set('status', status);
        await booking.save();
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            booking,
            "Booking status updated successfully"
        )
    }

    static async getStaffAppointments(params) {
        const { staffId } = params;
        console.log(
            [BOOKING_STATUS.SUCCESS, BOOKING_STATUS.COMPLETED]
        );

        const bookings = await Booking.findAll(
            {
                where: {
                    [Op.and]: [
                        {
                            staffId: {
                                [Op.eq]: staffId
                            }
                        },
                        {
                            status: {
                                [Op.in]: [BOOKING_STATUS.SUCCESS, BOOKING_STATUS.COMPLETED]
                            }
                        }
                    ]
                },
                order: [
                    ['date', 'ASC'],
                    ['time', 'ASC']
                ]
            }
        )
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            bookings,
            HTTP_REASON.OK
        )
    }


    static async rateBooking(body) {
        const { bookingId, rating, comment } = body;
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return JsonResult.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                null,
                "Booking not found"
            )
        }
        booking.set(
            'meta',
            {
                ...booking.getDataValue('meta'),
                rating,
                comment
            }
        );

        await booking.save();
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            booking,
            "Booking rated successfully"
        )
    }
}

module.exports = { BookingService };