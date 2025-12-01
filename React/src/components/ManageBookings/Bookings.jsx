import { useBookings } from "@src/hooks/UseBookings.jsx";
import { formatDate } from "@utils";
import { Edit, Phone, Scissors, Trash2, User } from "lucide-react";

const Bookings = () => {

    const { bookings } = useBookings()

    return (
        <div className="mt-2">
            <div className="font-bold text-lg text-[#1A2233] mb-2">
                Danh sách lịch hẹn ({bookings.length})
            </div>
            <div className="space-y-4">
                {
                    bookings.map(
                        (booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-2xl border border-white shadow p-6 hover:shadow-md transition"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    {/* Left: Customer & Service Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="w-12 h-12 bg-[#FF8800] rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-bold text-[#1A2233] text-lg">
                                                        {booking.meta.customer.name}
                                                    </h3>
                                                    {booking.status}
                                                </div>
                                                <div
                                                    className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2"
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="w-4 h-4" /> {booking.meta.customer.phone}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Scissors className="w-4 h-4" /> {booking.meta.service.name}
                                                    </span>
                                                    <span className="font-semibold text-[#FF8800]">
                                                        {booking.meta.service.price}
                                                    </span>
                                                </div>

                                                {
                                                    booking.meta.notes && (
                                                        <div className="text-sm text-gray-500">
                                                            <span
                                                                className="font-medium">Ghi chú:</span> {booking.meta.notes}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Date, Time & Actions */}
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="text-center lg:text-left">
                                            <div className="text-sm text-gray-500 mb-1">Thời gian</div>
                                            <div className="font-semibold text-[#1A2233]">
                                                {formatDate(booking.date)}
                                            </div>
                                            <div className="text-[#FF8800] font-medium">
                                                {booking.time} ({booking.meta.service.duration})
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition"
                                                title="Sửa"
                                            >
                                                <Edit className="w-5 h-5 text-[#1D9BF0]" />
                                            </button>
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-100 transition"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-5 h-5 text-[#EF4444]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>

    );
};

export default Bookings;