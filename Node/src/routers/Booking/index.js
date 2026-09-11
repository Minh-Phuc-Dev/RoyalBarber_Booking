const { wrapperAsyncHandler } = require("src/helpers/ErrorWrapper");
const { BookingController } = require("src/controllers/BookingController");
const { authenticate } = require("@middleware/Authenticate");
const router = require('express').Router()

router.get(
    "/booking/staff",
    wrapperAsyncHandler(BookingController.getStyleLists)
)


router.get(
    "/booking/taken-slots",
    wrapperAsyncHandler(BookingController.getTakenSlots)
)

router.get(
    "/booking/staff-appointments",
    authenticate,
    wrapperAsyncHandler(BookingController.getStaffAppointments)
)

router.post(
    "/booking/rate",
    authenticate,
    wrapperAsyncHandler(BookingController.rateBooking)
)

router.post(
    "/booking/status",
    authenticate,
    wrapperAsyncHandler(BookingController.setStatusBooking)
)

router.get(
    "/bookings",
    wrapperAsyncHandler(BookingController.getAllBookings)
)

router.get(
    "/mine/bookings",
    authenticate,
    wrapperAsyncHandler(BookingController.getMyBookings)
)

router.get(
    "/booking/complete-payment",
    wrapperAsyncHandler(BookingController.completeBookingPayment)
)

router.post(
    "/booking",
    wrapperAsyncHandler(BookingController.booking)
)



module.exports = router;
