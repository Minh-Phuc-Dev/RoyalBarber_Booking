import BookingStatus from "@src/components/Booking/BookingStatus";
import { TIME_RANGE } from "@src/enums";
import DashboardService from "@src/services/DashboardService";
import MediaService from "@src/services/MediaService";
import { formatDay, formatPrice, generateKey, randomHexColor } from "@src/utils";
import { BarChart3, Calendar, ChevronRight, ClipboardList, DollarSign, PieChart, RotateCw, Star, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// const quickActions = [
//     {
//         label: "Quản Lý Dịch Vụ",
//         desc: "Thêm, sửa, xóa dịch vụ salon",
//         icon: <ClipboardList className="w-6 h-6 text-[#1D9BF0]" />,
//         color: "bg-blue-50"
//     },
//     {
//         label: "Quản Lý Khách Hàng",
//         desc: "Xem danh sách và thông tin khách hàng",
//         icon: <Users className="w-6 h-6 text-[#22C55E]" />,
//         color: "bg-green-50"
//     },
//     {
//         label: "Quản Lý Đặt Lịch",
//         desc: "Xác nhận và quản lý lịch hẹn",
//         icon: <Calendar className="w-6 h-6 text-[#A855F7]" />,
//         color: "bg-purple-50"
//     },
//     {
//         label: "Khuyến Mãi",
//         desc: "Tạo và quản lý chương trình khuyến mãi",
//         icon: <Gift className="w-6 h-6 text-[#FF8800]" />,
//         color: "bg-orange-50"
//     }
// ];
/*
<div className="w-full">
    <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Thao Tác Nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                quickActions.map(
                    (action, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleQuickAction(action.label)}
                            className={`rounded-2xl border border-gray-100 shadow-sm bg-white p-5 flex flex-col gap-2 ${action.color} cursor-pointer hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {action.icon}
                                <span className="font-semibold text-gray-900">{action.label}</span>
                            </div>
                            <div className="text-sm text-gray-500">{action.desc}</div>
                        </div>
                    )
                )
            }
        </div>
    </div>
    <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Thông Báo Quan Trọng</h2>
        <div className="flex flex-col gap-3">
            {importantAlerts.map((alert, idx) => (
                <div
                    key={idx}
                    className={`rounded-2xl p-5 flex items-center justify-between shadow-sm ${alert.color}`}
                >
                    <div>
                        <div className="font-semibold flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            {alert.title}
                        </div>
                        <div className="text-gray-700 mt-1">{alert.content}</div>
                    </div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                </div>
            ))}
        </div>
    </div>
</div>
*/


const AdminDashboard = () => {

    const [time, setTime] = useState(TIME_RANGE.LATEST_7_DAY.value);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchData = useCallback(
        async () => {
            let params = {
                timeRange: 7
            }
            if (time === TIME_RANGE.LATEST_30_DAY.value) {
                params.timeRange = 30
            }
            if (time === TIME_RANGE.LATEST_90_DAY.value) {
                params.timeRange = 90
            }

            const { success, payload } = await DashboardService.getStatistics(params);
            if (success) {
                setLoading(false);
                setData(payload);
            }

        }, [time]
    )


    useEffect(() => {

        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <div className="animate-pulse h-8 bg-gray-200 rounded w-48 mb-2"></div>
                        <div className="animate-pulse h-4 bg-gray-200 rounded w-64"></div>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <div className="animate-pulse h-10 bg-gray-200 rounded w-32"></div>
                        <div className="animate-pulse h-10 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="animate-pulse rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
                                <div className="flex-1">
                                    <div className="h-6 bg-gray-200 rounded w-20 mb-1"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    const { revenue, booking, customer, rate, revenueCharts, bookingCharts, revenueByService, lastBooking } = data

    return (
        <div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard Quản Trị</h1>
                    <p className="text-gray-500">Chào mừng Admin Royal Barber - Tổng quan hoạt động kinh doanh Royal Barber</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">

                    <select
                        className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#FF8800]"
                        onClick={
                            ({ target }) => {
                                setTime(target.value)
                            }
                        }
                    >
                        {
                            Object.values(TIME_RANGE).map(
                                (item) => (
                                    <option key={item.value} value={item.value}>{item.name}</option>
                                )
                            )
                        }


                    </select>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
                    >
                        <RotateCw className="w-5 h-5" />
                        <span>Làm mới</span>
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-orange-100">
                            <DollarSign className="w-7 h-7 text-[#FF8800]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{formatPrice(revenue.total)}</div>
                            <div className="text-sm text-gray-500">Tổng Doanh Thu</div>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-right w-4 h-4 text-green-500"
                            aria-hidden="true"
                        >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                        <span className="text-green-600">+{revenue.change}%</span>
                        <span className="text-gray-400 ml-1">so với tháng trước</span>
                    </div> */}
                </div>
                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-100">
                            <Calendar className="w-7 h-7 text-[#1D9BF0]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{booking.total}</div>
                            <div className="text-sm text-gray-500">Lượt Đặt Lịch</div>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-right w-4 h-4 text-green-500"
                            aria-hidden="true"
                        >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                        <span className="text-green-600">+{booking.change}%</span>
                        <span className="text-gray-400 ml-1">so với tháng trước</span>
                    </div> */}
                </div>
                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-green-100">
                            <Users className="w-7 h-7 text-[#22C55E]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{customer.total}</div>
                            <div className="text-sm text-gray-500">Khách Hàng Mới</div>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-right w-4 h-4 text-green-500"
                            aria-hidden="true"
                        >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                        <span className="text-green-600">+{customer.change}%</span>
                        <span className="text-gray-400 ml-1">so với tháng trước</span>
                    </div> */}
                </div>
                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-yellow-100">
                            <Star className="w-7 h-7 text-[#FACC15]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{rate.total}</div>
                            <div className="text-sm text-gray-500">Đánh Giá TB</div>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-1 mt-2 text-xs font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-up-right w-4 h-4 text-green-500"
                            aria-hidden="true"
                        >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                        <span className="text-green-600">{rate.change}</span>
                        <span className="text-gray-400 ml-1">so với tháng trước</span>
                    </div> */}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 font-semibold text-gray-900">
                            <BarChart3 className="w-5 h-5 text-[#FF8800]" />
                            Doanh Thu
                        </div>
                    </div>
                    <div className="grow flex flex-col gap-2">
                        {
                            revenueCharts.map(
                                (item, index, values) => {
                                    const color = randomHexColor()
                                    return (
                                        <div key={`Math.random()-${index}`} className="flex items-center gap-3">
                                            <div className="w-8 text-gray-500">{item.label}</div>
                                            <div className="flex-1 h-3 bg-orange-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-3 rounded-full transition-all"
                                                    style={{ backgroundColor: color, width: `${item.value / values.reduce((total, item) => total + item.value, 0) * 100}%` }}
                                                />
                                            </div>
                                            <div className="w-14 text-right text-gray-700 font-semibold">{formatPrice(item.value)}</div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-500 text-sm">Tổng doanh thu</span>
                        <span className="font-bold text-gray-900">{formatPrice(revenueCharts.reduce((total, item) => total + item.value, 0))}</span>
                    </div>
                </div>

                <div className="rounded-3xl bg-white shadow-[0_2px_16px_0_rgba(16,30,54,0.06)] border border-white px-8 py-7 w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                        <PieChart className="w-6 h-6 text-[#FF8800]" />
                        <span className="font-bold text-lg text-[#1A2233]">Lượt Đặt Lịch</span>
                    </div>
                    <div className="text-gray-400 text-xs mb-4">Phân bố theo dịch vụ</div>
                    {/* Booking stats list */}
                    <div className="flex flex-col gap-4 mb-6 flex-1">
                        {
                            bookingCharts.map(
                                (item) => {
                                    const color = randomHexColor()
                                    return (
                                        <div key={item.label} className="flex items-center gap-3 w-full">
                                            <span style={{ backgroundColor: color }} className={`w-3 h-3 rounded-full inline-block flex-shrink-0`}></span>
                                            <span className="w-32 min-w-[90px] font-medium text-gray-900 text-sm truncate">{item.label}</span>
                                            <div className="flex-1 mx-2">
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-300 bg-red-500`}
                                                        style={{ width: `${((item.value / bookingCharts.reduce((total, item) => total + item.value, 0)) * 100)}%`, backgroundColor: color }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="w-12 text-gray-500 text-xs text-right">
                                                {((item.value / bookingCharts.reduce((total, item) => total + item.value, 0)) * 100).toFixed(0)}%
                                            </span>
                                            <span className="w-8 text-right font-bold text-gray-900 text-sm">{item.value}</span>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    <div className="border-t border-gray-100 pt-5 flex items-end justify-between">
                        <div>
                            <div className="text-2xl font-extrabold text-gray-900 leading-none">
                                {bookingCharts.reduce((total, item) => total + item.value, 0)}
                            </div>
                            <div className="text-gray-400 text-xs">Tổng lượt đặt</div>
                        </div>
                        {/* <div className="text-right">
                            <div className="text-green-600 text-lg font-bold leading-none">+8.2%</div>
                            <div className="text-gray-400 text-xs">So với tuần trước</div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Appointments */}
                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 font-semibold text-gray-900">
                            <ClipboardList className="w-5 h-5 text-[#FF8800]" />
                            Lịch Hẹn Gần Đây
                        </div>
                        <a href="#" className="text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1">
                            Xem tất cả <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="flex flex-col gap-3">
                        {
                            lastBooking.map(
                                (item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50">
                                        <img className="h-10 w-10 rounded-full object-cover" alt="" src={MediaService.getMedia(item.meta.service.image)} />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 truncate">{item.meta.service.name}</div>
                                            <div className="text-xs text-gray-500">{item.time} • {formatDay(item.date)}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-primary-500">{formatPrice(item.price)}</div>
                                        <BookingStatus status={item.status} />
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>


                <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 font-semibold text-gray-900">
                            <Star className="w-5 h-5 text-[#FACC15]" />
                            Dịch Vụ Hàng Đầu
                        </div>
                        <a href="#" className="text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1">
                            Xem chi tiết <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="flex flex-col gap-3">
                        {

                            revenueByService.map(
                                (item) => (
                                    <div key={generateKey()} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50">
                                        <img className="w-10 h-10 rounded-full object-cover" alt={item.label} src={MediaService.getMedia(item.image)} />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 truncate">{item.label}</div>
                                            <div className="text-xs text-gray-500">{Number(item.count).toFixed(0)} lượt đặt</div>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">{formatPrice(item.value)}</div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-500 text-sm">Tổng doanh thu từ top dịch vụ</span>
                        <span className="font-bold text-gray-900">
                            {formatPrice(revenueByService.reduce((total, item) => total + item.value, 0))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminDashboard;
