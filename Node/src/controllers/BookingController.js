const { AuthenticateContext } = require("@middleware/Authenticate");
const { JsonResult } = require("src/helpers/JsonResult");
const { BookingService } = require("src/services/BookingService");


class BookingController {

    /**
     * Get Style Lists
     * @param request
     * @param response
     */
    static async getStyleLists(request, response) {
        (await BookingService.getAvailableStaff()).send(response)
    }

    static async getTakenSlots(request, response) {
        (
            await BookingService.getTakenSlots(
                request.query
            )
        ).send(response)
    }

    //TODO: Save transaction
    /**
     * Complete Booking Payment
     * @param request
     * @param response
     */
    static async completeBookingPayment(request, response) {
        (
            await BookingService.completeBookingPayment(
                request.query
            )
        ).send(response)
    }


    /**
     * Booking
     * @param request
     * @param response
     */
    static async booking(request, response) {
        (
            await BookingService.booking(
                request.body
            )
        ).send(response)
    }

    /**
     * Get All Bookings
     * @param request
     * @param response
     */
    static async getAllBookings(request, response) {
        (
            await BookingService.getAll()
        ).send(response)
    }

    /**
     * Get My Bookings
     * @param request
     * @param response
     */
    static async getMyBookings(request, response) {
        (
            await BookingService.getByUserId(
                AuthenticateContext.getStore().user
            )
        ).send(response)
    }

    /**
     * Set status booking
     * @param request
     * @param response
     */
    static async setStatusBooking(request, response) {
        (
            await BookingService.setStatusBooking(request.body)
        ).send(response)
    }

    /**
     * Get appointment
     */
    static async getStaffAppointments(request, response) {
        (

            await BookingService.getStaffAppointments(
                { staffId: AuthenticateContext.getStore().id }

            )
        ).send(response)
    }


    static async rateBooking(request, response) {
        (
            await BookingService.rateBooking(
                request.body
            )
        ).send(response)
    }


}

module.exports = { BookingController };