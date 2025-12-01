import CreateService from "@components/ManageServices/CreateService.jsx";
import UpdateService from "@components/ManageServices/UpdateService.jsx";
import MediaService from "@services/MediaService.js";
import ServiceService from "@services/ServiceService.js";
import ServiceStatistics from "@src/components/ManageServices/ServiceStatistics";
import { CategoryBadge, StatusBadge } from "@src/components/Services/index.jsx";
import { SERVICE_CATEGORIES, SERVICE_STATUS } from "@src/constants/index.js";
import useBoolean from "@src/hooks/UseBoolean";
import { useServices } from "@src/hooks/UseServices.jsx";
import { formatDuration, formatPrice } from "@utils";
import { isEmpty } from "lodash";
import { Filter, Plus, Search, ToggleRight, Users, } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

function Services() {

    const [createService, setCreateService] = useBoolean(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { services: data, loading, fetchServices } = useServices()

    const services = useMemo(
        () => {
            let services = data.map(
                service => ({
                    ...service,
                    icon: service.icon || Users
                })
            )

            if (!isEmpty(selectedCategory)) {
                services = services.filter(service => service.category === selectedCategory)
            }

            if (!isEmpty(searchTerm)) {
                services = services.filter(service =>
                    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    service.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }
            return services

        }, [data, selectedCategory, searchTerm]
    )

    const onSuccessCreateService = useCallback(
        () => {
            setCreateService.off();
            fetchServices()
        }, [fetchServices, setCreateService]
    )

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#FAFBFC] ${fontFamily} flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8800] mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải dữ liệu dịch vụ...</p>
                </div>
            </div>
        );
    }


    return (
        <>
            <ServiceStatistics services={data} />
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                        placeholder="Tìm kiếm dịch vụ..."
                        value={searchTerm}
                        onChange={({ target }) => setSearchTerm(target.value)}
                        style={{ fontFamily: "Inter, sans-serif" }}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="relative w-full md:w-56">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            className="pl-12 outline-none pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                            value={selectedCategory}
                            onChange={({ target }) => setSelectedCategory(target.value)}
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            <option value="">Tất cả danh mục</option>

                            {
                                Object.values(SERVICE_CATEGORIES).map(
                                    (category) => (
                                        <option key={category.value} value={category.value}>{category.name}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold text-base shadow transition-all"
                        onClick={setCreateService.toggle}
                    >
                        <Plus className="w-5 h-5" />
                        Thêm Dịch Vụ
                    </button>
                </div>
            </div>

            {/* Services Table */}
            <div className="mt-2 bg-white rounded-2xl border border-white shadow p-0 overflow-x-auto">
                <table className="min-w-full" style={{ fontFamily: "Inter, sans-serif" }}>
                    <thead>
                        <tr className="text-gray-400 text-xs font-semibold uppercase bg-white border-b border-gray-100">
                            <th className="py-3 px-6 text-left">DỊCH VỤ</th>
                            <th className="py-3 px-6 text-left">DANH MỤC</th>
                            <th className="py-3 px-6 text-left">GIÁ</th>
                            <th className="py-3 px-6 text-left">THỜI GIAN</th>
                            <th className="py-3 px-6 text-left">TRẠNG THÁI</th>
                            <th className="py-3 px-6 text-left">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services.map(
                                (service) => (
                                    <tr key={service.id}
                                        className="border-b border-gray-50 hover:bg-orange-50/30 transition">
                                        {/* Dịch vụ */}
                                        <td className="py-4 px-6 min-w-[220px]">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={MediaService.getMedia(service.image)}
                                                    alt={service.name}
                                                    className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="font-semibold text-[#1A2233] text-sm">{service.name}
                                                        </div>

                                                    </div>
                                                    <div
                                                        className="text-gray-400 text-xs font-medium truncate max-w-[180px]">
                                                        {service.description || "Không có mô tả"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Danh mục */}
                                        <td className="py-4 px-6 min-w-[120px]">
                                            <CategoryBadge category={service.category} />
                                        </td>
                                        {/* Giá */}
                                        <td className="py-4 px-6 min-w-[100px]">
                                            <span className="font-bold text-[#1A2233]">
                                                {formatPrice(service.price)}
                                            </span>
                                        </td>
                                        {/* Thời gian */}
                                        <td className="py-4 px-6 min-w-[80px]">
                                            <span className="text-gray-700">
                                                {formatDuration(service.duration)}
                                            </span>
                                        </td>
                                        {/* Trạng thái */}
                                        <td className="py-4 px-6 min-w-[120px]">
                                            <StatusBadge isActive={service.status === SERVICE_STATUS.ACTIVE.value} />
                                        </td>
                                        {/* Thao tác */}
                                        <td className="py-4 px-6 min-w-[120px]">
                                            <div className="flex gap-2">

                                                <UpdateService
                                                    service={service}
                                                    onSuccess={fetchServices}
                                                />
                                                <button
                                                    className={`p-2 rounded-full hover:bg-gray-100 transition ${service.status === SERVICE_STATUS.ACTIVE.value ? 'text-green-600' : 'text-gray-400'}`}
                                                    title={service.status === SERVICE_STATUS.ACTIVE.value ? "Ngưng hoạt động" : "Kích hoạt"}
                                                    onClick={
                                                        async () => {
                                                            const { success } = await ServiceService.updateService(
                                                                {
                                                                    id: service.id,
                                                                    status: service.status === SERVICE_STATUS.INACTIVE.value ? SERVICE_STATUS.ACTIVE.value : SERVICE_STATUS.INACTIVE.value
                                                                }
                                                            )
                                                            if (success) {
                                                                fetchServices();
                                                            }
                                                        }
                                                    }
                                                >
                                                    <ToggleRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>

                {
                    services.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-sm">Danh sách dịch vụ trống</div>
                        </div>
                    )
                }
            </div>
            {

                createService ? (
                    <CreateService
                        isOpen={createService}
                        onClose={setCreateService.off}
                        onSuccess={onSuccessCreateService}
                    />
                ) : null


            }
        </>
    );
}

export default Services;