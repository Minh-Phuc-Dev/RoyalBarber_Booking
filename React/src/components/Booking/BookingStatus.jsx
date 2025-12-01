import { BOOKING_STATUS } from "@src/enums";

function BookingStatus({ status }) {

    return status === BOOKING_STATUS.PENDING.value ? (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
            {BOOKING_STATUS.PENDING.name}
        </span>
    ) : status === BOOKING_STATUS.COMPLETED.value ? (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            {BOOKING_STATUS.COMPLETED.name}
        </span>
    ) : status === BOOKING_STATUS.CANCELLED.value ? (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
            {BOOKING_STATUS.CANCELLED.name}
        </span>
    ) : status === BOOKING_STATUS.SUCCESS.value ? (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            {BOOKING_STATUS.SUCCESS.name}
        </span>
    ) : null
}

export default BookingStatus