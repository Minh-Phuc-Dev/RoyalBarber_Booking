import { PROMOTION_STATUS } from "@src/enums";
import { Percent, Tag, Users } from "lucide-react";

function PromotionStatistics({ promotions = [] }) {

    const data = [
        {
            label: "Đang hoạt động",
            value: promotions.filter(promotion => promotion.status === PROMOTION_STATUS.ACTIVE.value).length,
            icon: (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50">
                    <Tag className="w-6 h-6 text-[#22C55E]" />
                </div>
            ),
        },
        {
            label: "Lượt sử dụng",
            value: promotions.reduce((total, promotion) => total + promotion.usage, 0),
            icon: (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50">
                    <Users className="w-6 h-6 text-[#1D9BF0]" />
                </div>
            ),
        },
        {
            label: "Tiết kiệm KH",
            value: promotions.reduce((total, promotion) => total + (promotion.usage * promotion.value), 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
            icon: (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50">
                    <Percent className="w-6 h-6 text-[#A855F7]" />
                </div>
            ),
        }
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {
                data.map(
                    (promotion, id) => (
                        <div
                            key={id}
                            className="rounded-2xl border shadow-sm bg-white p-6 flex items-center gap-4"
                        >
                            {promotion.icon}
                            <div>
                                <div className="text-xl font-extrabold text-[#1A2233] mb-1">{promotion.value}</div>
                                <div className="text-sm font-medium text-gray-500">{promotion.label}</div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default PromotionStatistics;