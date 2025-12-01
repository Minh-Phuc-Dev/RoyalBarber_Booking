import { Calendar, CheckCircle, Clock, Scissors, Star, X } from "lucide-react";

import BookingStatus from "@src/components/Booking/BookingStatus";
import { BOOKING_STATUS } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import { useMineBookings } from "@src/hooks/UseMineBookings";
import BookingService from "@src/services/BookingService";
import MediaService from "@src/services/MediaService";
import { formatDateValue, formatPrice } from "@src/utils";
import { isEmpty, isNumber } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const CancelButton = ({ onSuccess, booking }) => {

    const [canceling, setCanceling] = useBoolean(false);


    return (
        <>
            {
                booking.status === BOOKING_STATUS.SUCCESS.value ? (
                    <button
                        onClick={setCanceling.on}
                        className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Hủy
                    </button>
                ) : null
            }
            {
                canceling ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">

                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={setCanceling.off}
                            />

                            <div className="relative bg-white rounded-2xl shadow-xl min-w-96  max-h-[90vh] overflow-y-auto">

                                <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Hủy Lịch Hẹn
                                    </h2>
                                    <button
                                        onClick={setCanceling.off}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-gray-700 px-6 py-4">
                                        Bạn có chắc chắn muốn hủy lịch hẹn này không?
                                        Hành động này không thể hoàn tác.
                                    </p>
                                    <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-200">
                                        <button
                                            onClick={setCanceling.off}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={
                                                async () => {
                                                    const { success } = await BookingService.updateStatusBooking(
                                                        booking.id,
                                                        BOOKING_STATUS.CANCELLED.value
                                                    )
                                                    if (success) {
                                                        setCanceling.off();
                                                        onSuccess();
                                                        toast.success("Thao tác thành công!");
                                                        return
                                                    }
                                                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                                                }
                                            }
                                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    )
}

const RateButton = ({ booking, onSuccess }) => {
    const [open, setOpen] = useBoolean(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        values: {
            rating: booking.meta?.rating || 5,
            comment: booking.meta?.comment || ""
        }
    });



    const rating = watch("rating");
    const [hoverRating, setHoverRating] = useState(0);

    const onSubmit = async (data) => {
        if (!data.rating) {
            toast.error("Vui lòng chọn số sao đánh giá.");
            return;
        }
        const { success } = await BookingService.rateBooking(
            booking.id,
            data
        );
        if (success) {
            toast.success("Đánh giá thành công!");
            setOpen.off();
            reset();
            onSuccess && onSuccess();
        } else {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <>
            {
                isNumber(booking.meta?.rating) ? (
                    <button
                        onClick={setOpen.on}
                        className="flex items-center gap-1 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg"
                    >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{booking.meta?.rating}/5</span>
                    </button>
                ) : null
            }
            {
                booking.status === BOOKING_STATUS.COMPLETED.value && !isNumber(booking.meta?.rating) ? (
                    <button
                        onClick={setOpen.on}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                        <Star className="w-4 h-4" />
                        Đánh giá
                    </button>
                ) : null
            }
            {
                open ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-2xl shadow-xl min-w-96 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Đánh giá dịch vụ</h2>
                                <button
                                    onClick={() => {
                                        setOpen.off();
                                        reset();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setValue("rating", star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                    fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <input type="hidden" {...register("rating", { required: true })} />
                                    <span className="text-sm text-gray-600 mt-1">
                                        {rating ? `Bạn đánh giá ${rating} sao` : "Chọn số sao"}
                                    </span>
                                    {errors.rating && (
                                        <span className="text-xs text-red-500">Vui lòng chọn số sao đánh giá.</span>
                                    )}
                                </div>
                                <div>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        rows={4}
                                        placeholder="Nhận xét của bạn về dịch vụ..."
                                        {...register("comment")}
                                    />
                                </div>
                                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpen.off();
                                            reset();
                                        }}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-[#FF8800] text-white hover:bg-orange-600 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
};


//TODO: Debug booking.meta.staff being null
const MyAppointmentsPage = () => {

    const { bookings, loading, error, fetch } = useMineBookings();



    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetch}
                        className="btn-primary"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch Hẹn Của Tôi</h1>
                    <p className="text-gray-600">Quản lý tất cả lịch hẹn đặt dịch vụ của bạn</p>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tổng lịch hẹn</p>
                                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Sắp tới</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {bookings.filter(booking => [BOOKING_STATUS.SUCCESS.value].includes(booking.status)).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Hoàn thành</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {bookings.filter(booking => [BOOKING_STATUS.COMPLETED.value].includes(booking.status)).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tổng chi tiêu</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {
                                        formatPrice(
                                            bookings.reduce((total, booking) => total + Number(booking.price || 0), 0)
                                        )
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                                <Scissors className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="space-y-4">
                    {
                        bookings.map(
                            (booking) => (
                                <div key={booking.id} className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <img src={MediaService.getMedia(booking.meta.service.image)} alt={booking.meta.service.name} className="w-12 h-12 aspect-square object-contain" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-gray-900 text-lg">{booking.meta.service.name}</h3>
                                                        <span className="bg-purple-500 px-3 py-1 rounded-xl font-medium text-white text-xs">{booking.code}</span>
                                                        <BookingStatus status={booking.status} />
                                                        {
                                                            isEmpty(booking?.meta?.voucher) ? null : (
                                                                <span className="text-sm text-green-600 font-medium">
                                                                    -{formatPrice(booking.meta.voucher.value)}
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" /> {formatDateValue(booking.date).split("-").reverse().join("/")}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" /> {booking.time} ({booking.meta.service.duration})
                                                        </span>

                                                        <span className="font-semibold text-[#FF8800]">
                                                            {formatPrice(booking.price)}
                                                        </span>

                                                    </div>
                                                    <div className="text-sm text-gray-600 mb-2">
                                                        <span className="font-medium">Thợ cắt:</span> {booking.meta.staff?.displayName} - {booking.meta.staff?.phone || booking.meta.staff?.email}
                                                    </div>
                                                    {
                                                        isEmpty(booking?.meta?.voucher) ? null : (
                                                            <p className="font-medium text-sm text-gray-600">
                                                                {booking.meta.voucher.title}. Tiết kiệm -{formatPrice(booking.meta.voucher.value)}
                                                            </p>
                                                        )
                                                    }
                                                    {
                                                        booking.meta?.notes && (
                                                            <div className="text-sm text-gray-500">
                                                                <span className="font-medium">Ghi chú:</span> {booking.meta?.notes}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        isEmpty(booking?.meta?.comment) ? null : (
                                                            <p className="font-medium text-sm text-gray-600">
                                                                {`Đánh giá: ${booking.meta.comment}`}
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex items-center gap-2">
                                            <CancelButton
                                                booking={booking}
                                                onSuccess={fetch}
                                            />

                                            <RateButton
                                                booking={booking}
                                                onSuccess={fetch}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        )
                    }
                </div>


            </div>

        </div>
    );
};

export default MyAppointmentsPage;