import { StatusBadge } from '@src/components/ManagePromotions/Badge';
import CreatePromotion from '@src/components/ManagePromotions/CreatePromotion';
import PromotionStatistics from '@src/components/ManagePromotions/PromotionStatistics';
import UpdatePromotion from '@src/components/ManagePromotions/UpdatePromotion';
import { PROMOTION_STATUS } from '@src/enums';
import useBoolean from '@src/hooks/UseBoolean';
import { usePromotions } from '@src/hooks/UsePromotions';
import { formatDay, formatPrice } from '@src/utils';
import { isEmpty } from 'lodash';
import { Edit, Eye, Filter, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const Promotions = () => {
    const [create, setCreate] = useBoolean(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const { promotions: data, fetch } = usePromotions();

    const promotions = useMemo(
        () => {
            let results = [...data];
            if (!isEmpty(search)) {
                results = results.filter(
                    promotion => promotion.title.toLowerCase().includes(search.toLowerCase()) || promotion.code.toLowerCase().includes(search.toLowerCase()) || promotion.description.toLowerCase().includes(search.toLowerCase())
                )
            }

            if (!isEmpty(status)) {
                results = results.filter(
                    promotion => promotion.status === status
                )
            }
            return results
        }, [search, status, data]
    )


    return (
        <>
            <PromotionStatistics
                promotions={data}
            />
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                        placeholder="Tìm kiếm theo tên, mã khuyến mãi..."
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="relative w-full md:w-56">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white w-full font-medium text-gray-700 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent transition"
                            value={status}
                            onChange={({ target }) => setStatus(target.value)}

                        >
                            <option value={""}>Tất cả trạng thái</option>
                            {
                                Object.values(PROMOTION_STATUS).map(
                                    status => (
                                        <option key={status.value} value={status.value}>{status.name}</option>
                                    )
                                )
                            }

                        </select>
                    </div>
                    <button
                        onClick={setCreate.on}

                        className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold text-base shadow transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Tạo Khuyến Mãi
                    </button>
                </div>
            </div>
            <div className="mt-2 bg-white rounded-2xl border border-white shadow p-0 overflow-x-auto">
                <table className="min-w-full" style={{ fontFamily: "Inter, sans-serif" }}>
                    <thead>
                        <tr className="text-gray-400 text-xs font-semibold uppercase bg-white border-b border-gray-100">
                            <th className="p-2 text-left">KHUYẾN MÃI</th>
                            <th className="p-2 text-left">MÃ & GIÁ TRỊ</th>
                            <th className="p-2 text-left">THỜI GIAN</th>
                            <th className="p-2 text-left">SỬ DỤNG</th>
                            <th className="p-2 text-left">TRẠNG THÁI</th>
                            <th className="p-2 text-left">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            promotions.map(
                                (promotion) => (
                                    <tr key={promotion.id} className="text-xs border-b border-gray-50 hover:bg-orange-50/30 transition">

                                        <td className="p-2">
                                            <div className="font-semibold text-[#1A2233] text-sm mb-1">{promotion.title}</div>
                                            <div className="text-gray-400 font-medium">{promotion.description}</div>
                                        </td>

                                        <td className="p-2">
                                            <div className="font-semibold mb-1">{promotion.code}</div>
                                            <span>{formatPrice(promotion.value)}</span>
                                        </td>


                                        <td className="p-2">
                                            <p className="text-gray-700 font-medium">Từ: {formatDay(promotion.startDate)}</p>
                                            <p className="text-gray-700 font-medium">Đến: {formatDay(promotion.endDate)}</p>
                                        </td>

                                        <td className="p-2">
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-[#1A2233] text-sm">{promotion.usage}</span>
                                                <span className="text-gray-400">/ {promotion.total}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                                                <div
                                                    className="h-1.5 rounded-full bg-gradient-to-r from-[#FF8800] to-orange-400 transition-all"
                                                    style={{ width: `${(promotion.usage / promotion.total) * 100}%` }}
                                                />
                                            </div>
                                        </td>

                                        <td className="p-2">
                                            <StatusBadge status={promotion.status} />
                                        </td>

                                        <td className="p-2">
                                            <div className="flex gap-2">
                                                <UpdatePromotion
                                                    promotion={promotion}
                                                    onSuccess={fetch}
                                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                                >
                                                    <Eye className="w-5 h-5 text-[#FF8800]" />
                                                </UpdatePromotion>
                                                <UpdatePromotion
                                                    promotion={promotion}
                                                    onSuccess={fetch}
                                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                                >
                                                    <Edit className="w-5 h-5 text-[#1D9BF0]" />
                                                </UpdatePromotion>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                create ? (
                    <CreatePromotion
                        onClose={setCreate.off}
                        onSuccess={
                            () => {
                                setCreate.off()
                                fetch()
                            }
                        }

                    />
                ) : null
            }
        </>

    )
}

export default Promotions