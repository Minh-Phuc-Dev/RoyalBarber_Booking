import api, { requestApiHelper } from "@src/apis/index.js";


class BookingService {

    static getStaffAppointments() {
        return requestApiHelper(
            api.get(
                "booking/staff-appointments"
            )
        )
    }

    static rateBooking(bookingId, data) {
        return requestApiHelper(
            api.post(
                "booking/rate",
                {
                    bookingId,
                    ...data
                }
            )
        )
    }


    static getStaff() {
        return requestApiHelper(
            api.get(
                "booking/staff"
            )
        )
    }

    static getSlots(serviceId, staffId, date) {
        return requestApiHelper(
            api.get(
                `/booking/taken-slots?serviceId=${serviceId}&staffId=${staffId}&date=${date}`
            )
        )
    }

    static completeBooking(prams) {
        return requestApiHelper(
            api.get(
                `booking/complete-payment${prams}`
            )
        )
    }

    static booking(data) {
        return requestApiHelper(
            api.post(
                "booking",
                data
            )
        )
    }

    static getAllBookings() {
        return requestApiHelper(
            api.get(
                "bookings"
            )
        )
    }

    static getMineBookings() {
        return requestApiHelper(
            api.get(
                "mine/bookings"
            )
        )
    }

    static updateStatusBooking(bookingId, status) {
        return requestApiHelper(
            api.post(
                "/booking/status",
                { bookingId, status }
            )
        )
    }


    static


}

export default BookingService;