import { PieChart } from "lucide-react";

// Dummy data booking stats
const bookingStats = [
    {
        label: "Classic Cut",
        color: "bg-[#2563eb]",
        percent: 33.3,
        count: 45,
        bar: "bg-[#2563eb]",
    },
    {
        label: "Modern Fade",
        color: "bg-[#22c55e]",
        percent: 23.7,
        count: 32,
        bar: "bg-[#22c55e]",
    },
    {
        label: "Premium Package",
        color: "bg-[#a855f7]",
        percent: 20.7,
        count: 28,
        bar: "bg-[#a855f7]",
    },
    {
        label: "Beard Styling",
        color: "bg-[#f97316]",
        percent: 13.3,
        count: 18,
        bar: "bg-[#f97316]",
    },
    {
        label: "Hair Wash",
        color: "bg-[#ec4899]",
        percent: 8.9,
        count: 12,
        bar: "bg-[#ec4899]",
    },
];

const BookingStatsCard = () => {
    return (
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
                    bookingStats.map(
                        (item) => (
                            <div key={item.label} className="flex items-center gap-3 w-full">
                                <span className={`w-3 h-3 rounded-full ${item.color} inline-block flex-shrink-0`}></span>
                                <span className="w-32 min-w-[90px] font-medium text-gray-900 text-sm truncate">{item.label}</span>
                                <div className="flex-1 mx-2">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${item.bar}`}
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="w-12 text-gray-500 text-xs text-right">{item.percent}%</span>
                                <span className="w-8 text-right font-bold text-gray-900 text-sm">{item.count}</span>
                            </div>
                        )
                    )
                }
            </div>
            <div className="border-t border-gray-100 pt-5 flex items-end justify-between">
                <div>
                    <div className="text-2xl font-extrabold text-gray-900 leading-none">135</div>
                    <div className="text-gray-400 text-xs">Tổng lượt đặt</div>
                </div>
                <div className="text-right">
                    <div className="text-green-600 text-lg font-bold leading-none">+8.2%</div>
                    <div className="text-gray-400 text-xs">So với tuần trước</div>
                </div>
            </div>
        </div>
    );
};

export default BookingStatsCard;
