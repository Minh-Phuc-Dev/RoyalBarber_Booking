
import { yupResolver } from "@hookform/resolvers/yup";
import BookingStatus from "@src/components/Booking/BookingStatus";
import { useAuthenticate } from "@src/contexts/AuthenticateContext";
import { BOOKING_STATUS, PAYMENT_METHODS } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import { useCustomers } from "@src/hooks/UseCustomers";
import { usePromotions } from "@src/hooks/UsePromotions";
import { useServices } from "@src/hooks/UseServices";
import { useStaffBooking } from "@src/hooks/UseStaffBooking";
import BookingService from "@src/services/BookingService";
import MediaService from "@src/services/MediaService";
import { formatDateValue, formatPrice, generateCode } from "@src/utils";
import { isEmpty, isNumber } from "lodash";
import { Calendar, CheckCircle, Clock, Filter, Plus, Scissors, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Yup from "yup";



const SuccessButton = ({ booking, onSuccess }) => {
    const [open, setOpen] = useBoolean(false);


    return (
        <>
            {
                booking.status === BOOKING_STATUS.SUCCESS.value ? (
                    <button
                        onClick={setOpen.on}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg transition-colors"
                    >
                        Hoàn thành
                    </button>
                ) : null
            }
            {
                open ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">

                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={setOpen.off}
                            />

                            <div className="relative bg-white rounded-2xl shadow-xl min-w-96  max-h-[90vh] overflow-y-auto">

                                <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Xác nhận hoàn thành
                                    </h2>
                                    <button
                                        onClick={setOpen.off}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-gray-700 px-6 py-4">
                                        Xác nhận rằng bạn đã hoàn thành lịch hẹn này.
                                        Hành động này không thể hoàn tác.
                                    </p>
                                    <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-200">
                                        <button
                                            onClick={setOpen.off}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button

                                            data-key={booking.id}
                                            onClick={
                                                async () => {
                                                    console.log(booking);

                                                    const { success } = await BookingService.updateStatusBooking(
                                                        booking.id,
                                                        BOOKING_STATUS.COMPLETED.value
                                                    )
                                                    if (success) {
                                                        setOpen.off();
                                                        onSuccess();
                                                        toast.success("Thao tác hoàn thành lịch hẹn thành công!");
                                                        return
                                                    }
                                                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                                                }
                                            }
                                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
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

const CancelButton = ({ booking, onSuccess }) => {
    const [open, setOpen] = useBoolean(false);


    return (
        <>
            {
                booking.status === BOOKING_STATUS.SUCCESS.value ? (
                    <button
                        onClick={setOpen.on}
                        className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Hủy
                    </button>
                ) : null
            }
            {
                open ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">

                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={setOpen.off}
                            />

                            <div className="relative bg-white rounded-2xl shadow-xl min-w-96  max-h-[90vh] overflow-y-auto">

                                <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Hủy Lịch Hẹn
                                    </h2>
                                    <button
                                        onClick={setOpen.off}
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
                                            onClick={setOpen.off}
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
                                                        setOpen.off();
                                                        onSuccess();
                                                        toast.success("Thao tác hủy lịch hẹn thành công!");
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

const bookingSchema = Yup.object().shape(
    {
        serviceId: Yup.string().required("Dịch vụ là bắt buộc"),
        date: Yup.date().required("Ngày là bắt buộc").typeError("Ngày không hợp lệ"),
        time: Yup.string().required("Thời gian là bắt buộc").typeError("Thời gian không hợp lệ"),
        price: Yup.number().min(0, "Giá phải lớn hơn hoặc bằng 0").required("Giá là bắt buộc"),
        notes: Yup.string().max(500, "Ghi chú không được vượt quá 500 ký tự"),
    }
);

const CreateAppointment = ({ onSuccess }) => {
    const user = useAuthenticate().store.user
    const [open, setOpen] = useBoolean(false);

    const { users: customers } = useCustomers();
    const { services } = useServices();
    const { promotions } = usePromotions()

    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: yupResolver(bookingSchema),
            defaultValues: {
                serviceId: "",
                customerId: "",
                staffId: user.id,
                voucherId: "",
                date: "",
                time: "",
                price: 0,
                notes: "",
            },
        }
    );

    const service = services.find(
        (service) => service.id === Number.parseInt(watch("serviceId"))
    )

    const voucher = promotions.find(
        (promotion) => promotion.id === Number.parseInt(watch("voucherId"))
    )
    const customer = customers.find(
        (customer) => customer.id === Number.parseInt(watch("customerId"))
    )

    const onSubmit = async (data) => {
        const payload = {
            code: generateCode("BOOKING"),
            serviceId: Number.parseInt(data.serviceId),
            staffId: user.id,
            date: formatDateValue(data.date),
            time: data.time,
            paymentMethod: PAYMENT_METHODS.CASH.value,
            price: isEmpty(service) ? 0 : service.price - (isEmpty(voucher) ? 0 : voucher.value),
            userId: isEmpty(customer) ? null : Number.parseInt(data.customerId),
            notes: data.notes,
            meta: {
                staff: user,
                service: service,
                voucher: voucher || null,
                customer: isEmpty(customer) ? {
                    name: "Khách lẻ",
                    phone: "",
                    email: "",
                } : customer
            }
        }
        const { success } = await BookingService.booking(payload);
        if (success) {
            toast.success("Tạo lịch hẹn thành công!");
            setOpen.off();
            onSuccess?.();
            return;
        }
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");

    }


    return (
        <>
            <button
                onClick={setOpen.on}
                className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold text-base shadow transition-all"
            >
                <Plus className="w-5 h-5" />
                Thêm Lịch Hẹn
            </button>
            {
                open ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                            />
                            <div className="relative bg-white rounded-2xl shadow-xl min-w-96  max-h-[90vh] overflow-y-auto">
                                <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Thêm Lịch Hẹn Mới
                                    </h2>
                                    <button
                                        onClick={setOpen.off}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <form
                                    className="p-5 w-screen max-w-3xl space-y-5"
                                    onSubmit={
                                        handleSubmit(onSubmit)
                                    }
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1 sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 ">
                                                Khách hàng
                                            </label>
                                            <select
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                                {...register("customerId")}
                                            >
                                                <option value="">Khách lẻ</option>
                                                {
                                                    customers.map(
                                                        (member) => (
                                                            <option
                                                                key={member.id}
                                                                value={member.id}
                                                            >
                                                                {member.displayName} - {member.email || member.phone}
                                                            </option>
                                                        )
                                                    )
                                                }
                                            </select>
                                            {errors.customerId && (
                                                <p className="text-red-500 text-xs mt-1">{errors.customerId.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700 ">
                                                Dịch vụ
                                            </label>
                                            <select
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                                {...register("serviceId")}
                                            >
                                                <option value="">Chọn dịch vụ</option>
                                                {
                                                    services.map(
                                                        (service) => (
                                                            <option
                                                                key={service.id}
                                                                value={service.id}
                                                            >
                                                                {service.name}
                                                            </option>
                                                        )
                                                    )
                                                }
                                            </select>
                                            {errors.serviceId && (
                                                <p className="text-red-500 text-xs mt-1">{errors.serviceId.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700 ">
                                                Giảm giá
                                            </label>
                                            <select
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                                {...register("voucherId")}
                                            >
                                                <option value="">Chọn mã giảm giá</option>
                                                {
                                                    promotions.map(
                                                        (voucher) => (
                                                            <option
                                                                key={voucher.id}
                                                                value={voucher.id}
                                                            >
                                                                {voucher.title} - Giảm {formatPrice(voucher.value)}
                                                            </option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700 ">
                                                Ngày
                                            </label>
                                            <input
                                                type="date"
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                                {...register("date")}
                                            />
                                            {errors.date && (
                                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700 ">
                                                Thời gian
                                            </label>
                                            <input
                                                type="time"
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                                {...register("time")}
                                            />
                                            {errors.time && (
                                                <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                                            )}
                                        </div>

                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-primary-500">Thông tin lịch hẹn</p>
                                        <div className="grid grid-cols-2">
                                            <div className="">
                                                <p>
                                                    <span className="font-medium">Nhân viên: </span>
                                                    {
                                                        isEmpty(user) ? "Chưa chọn" : user.displayName
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                    <span className="font-medium">Khách hàng: </span>
                                                    {
                                                        isEmpty(customer) ? "Khách lẻ" : customer.displayName
                                                    }
                                                </p>
                                            </div>
                                            <div className="">
                                                <p>
                                                    <span className="font-medium">Dịch vụ: </span>
                                                    {
                                                        isEmpty(service) ? "Chưa chọn" : service.name
                                                    }
                                                </p>

                                            </div>

                                            <div className="">
                                                <p>
                                                    <span className="font-medium">Mã giảm giá: </span>
                                                    {
                                                        isEmpty(voucher) ? "Chưa chọn" : `${voucher.title}`
                                                    }
                                                </p>
                                            </div>
                                            <div className="">
                                                <p>
                                                    <span className="font-medium">Ngày: </span> {watch("date") || "Chưa chọn"}
                                                </p>
                                            </div>
                                            <div className="">
                                                <p>
                                                    <span className="font-medium">Thời gian: </span> {watch("time") || "Chưa chọn"}
                                                </p>
                                            </div>
                                            <div className="">
                                                <p className="text-green-800">
                                                    <span className="font-medium">Tổng cộng: </span>
                                                    {
                                                        isEmpty(service) ? "" : formatPrice(
                                                            service.price - (isEmpty(voucher) ? 0 : voucher.value)
                                                        )
                                                    }
                                                    {
                                                        isEmpty(voucher) || isEmpty(service) ? null : (
                                                            <span className="text-sm text-green-600 font-medium ml-2">
                                                                (-{formatPrice(voucher.value)} giảm giá)
                                                            </span>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="mt-6 w-full px-4 py-3 bg-[#FF8800] hover:bg-orange-600 text-white rounded-xl font-semibold text-base shadow transition-all disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            {isSubmitting ? "Đang tạo..." : "Tạo Lịch Hẹn"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )


}

const ManageAppointmentsPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const { booking: data, loading, error, fetch } = useStaffBooking()


    const bookings = useMemo(
        () => {
            let results = [...data]
            if (!isEmpty(search)) {
                results = results.filter(
                    (booking) => {
                        const serviceName = booking.meta?.service?.name?.toLowerCase() || "";
                        return serviceName.includes(search.toLowerCase()) || booking.code?.toLowerCase().includes(search.toLowerCase())
                    }
                )
            }

            if (!isEmpty(status)) {
                results = results.filter(
                    (booking) => booking.status === status
                )
            }

            return results;
        },
        [data, search, status]
    )


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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tổng lịch hẹn</p>
                                <p className="text-2xl font-bold text-gray-900">{data.length}</p>
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
                                    {data.filter(booking => [BOOKING_STATUS.SUCCESS.value].includes(booking.status)).length}
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
                                    {data.filter(booking => [BOOKING_STATUS.COMPLETED.value].includes(booking.status)).length}
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
                                            data.reduce((total, booking) => total + Number(booking.price || 0), 0)
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

                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                            placeholder="Tìm kiếm lịch hẹn..."
                            value={search}
                            onChange={({ target }) => setSearch(target.value)}

                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative w-full md:w-40">
                            <Filter className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                                value={status}
                                onChange={({ target }) => setStatus(target.value)}

                            >
                                <option value="">Tất cả</option>
                                {
                                    Object.values(BOOKING_STATUS).map(
                                        (status) => (
                                            <option
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.name}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        <CreateAppointment onSuccess={fetch} />
                    </div>
                </div>


                <div className="space-y-4">
                    {
                        bookings.map(
                            (booking) => {
                                return (
                                    <div data-key={booking.id} key={`${Math.random()}${booking.id}`} className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
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
                                                                    Sử dụng: {booking.meta.voucher.title}. Giảm: -{formatPrice(booking.meta.voucher.value)}
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
                                                <SuccessButton
                                                    booking={booking}
                                                    onSuccess={fetch}
                                                />


                                                {
                                                    isNumber(booking.meta?.rating) ? (
                                                        <div className="flex items-center gap-1 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg">
                                                            <Star className="w-4 h-4 fill-current" />
                                                            <span className="font-medium">{booking.meta?.rating}/5</span>
                                                        </div>
                                                    ) : null
                                                }

                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageAppointmentsPage;