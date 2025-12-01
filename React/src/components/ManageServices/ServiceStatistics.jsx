import { SERVICE_STATUS } from "@src/constants";
import { Scissors, ToggleRight } from "lucide-react";

function ServiceStatistics({ services }) {

    const statistics = [
        {
            label: "Tổng dịch vụ",
            value: services.length,
            icon: <Scissors className="w-6 h-6 text-[#1D9BF0]" />,
            iconBg: "bg-blue-50",
        },
        {
            label: "Đang hoạt động",
            value: services.filter(service => service.status === SERVICE_STATUS.ACTIVE.value).length,
            icon: <ToggleRight className="w-6 h-6 text-[#22C55E]" />,
            iconBg: "bg-green-50",
        },
        {
            label: "Tạm ngưng",
            value: services.filter(service => service.status === SERVICE_STATUS.INACTIVE.value).length,
            icon: <ToggleRight className="w-6 h-6 text-[#EF4444]" />,
            iconBg: "bg-red-50",
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {
                statistics.map(
                    (item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border shadow-sm bg-white p-6 flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                                {item.icon}
                            </div>
                            <div>
                                <div className="text-xl font-extrabold text-[#1A2233] mb-1">{item.value}</div>
                                <div className="text-sm font-medium text-gray-500">{item.label}</div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default ServiceStatistics;