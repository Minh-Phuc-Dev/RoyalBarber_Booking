import ActionUser from "@src/components/ManageUsers/ActionUser";
import CreateUser from "@src/components/ManageUsers/CreateUser";
import User from "@src/components/ManageUsers/User";
import { UserStatus } from "@src/components/ManageUsers/Users";
import { USER_STATUS } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import { useCustomers } from "@src/hooks/UseCustomers";
import MediaService from "@src/services/MediaService";
import { formatDate, formatPrice } from "@src/utils";
import { isEmpty } from "lodash";
import { Calendar, Plus, Search, Users } from "lucide-react";
import React, { useMemo } from "react";


const AdminCustomersPage = () => {
    const [role] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [status, setStatus] = React.useState("");

    const [create, setCreate] = useBoolean(false);

    const { users: data, fetch } = useCustomers()

    const statistics = [
        {
            label: "Tổng khách hàng",
            value: data.length,
            icon: <Users className="w-6 h-6 text-[#1D9BF0]" />,
            iconBg: "bg-blue-50",
        },
        {
            label: "Hoạt động",
            value: data.filter(user => user.status === USER_STATUS.ACTIVE.value).length,
            icon: <Users className="w-6 h-6 text-[#22C55E]" />,
            iconBg: "bg-green-50",
        },
        {
            label: "Tổng doanh thu",
            value: formatPrice(data.reduce((sum, user) => sum + (user.totalSpent || 0), 0)),

            icon: <Calendar className="w-6 h-6 text-[#FF8800]" />,
            iconBg: "bg-orange-50",
        },
    ];



    const users = useMemo(
        () => {
            let results = [...data];

            if (!isEmpty(search)) {
                results = results.filter(
                    (user) =>
                        user.displayName.toLowerCase().includes(search.toLowerCase()) ||
                        user.email.toLowerCase().includes(search.toLowerCase()) ||
                        user.id.toString().includes(search)
                );
            }

            if (!isEmpty(role)) {
                results = results.filter(
                    (user) => user.role === role
                );
            }

            if (!isEmpty(status)) {
                results = results.filter(
                    (user) => user.status === status
                );
            }

            return results;
        }, [data, search, role, status]
    )


    return (
        <div className="w-full space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {
                    statistics.map(
                        (stat, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border shadow-sm bg-white p-6 flex items-center gap-4"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-xl font-extrabold text-[#1A2233] mb-1">{stat.value}</div>
                                    <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={search}
                            onChange={
                                ({ target: { value } }) => setSearch(value)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-3">


                        <select
                            value={status}
                            onChange={({ target: { value } }) => setStatus(value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Tất cả</option>
                            {
                                Object.values(USER_STATUS).map(
                                    (status) => (
                                        <option key={status.value} value={status.value}>{status.name}</option>
                                    )
                                )
                            }
                        </select>

                        <button
                            className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold text-base shadow transition-all"
                            onClick={setCreate.on}
                        >
                            <Plus className="size-4" />
                            <span>Thêm Người Dùng</span>
                        </button>

                        {
                            create ? (
                                <CreateUser
                                    onClose={setCreate.off}
                                    onSuccess={
                                        async () => {
                                            setCreate.off()
                                            await fetch()
                                        }
                                    }
                                />
                            ) : null
                        }

                    </div>


                </div>
            </div>
            <div className="bg-white rounded-lg border shadow p-0 overflow-x-auto ">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đã đặt
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doanh thu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đánh giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            isEmpty(users) ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                        Danh sách trống!
                                    </td>
                                </tr>
                            ) : users.map(
                                (user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={MediaService.getMedia(user.attributes.avatar)}
                                                    alt={user.name}
                                                />
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{user.displayName}</div>
                                                    <div className="text-sm text-gray-500">ID: {user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {
                                                user.totalBookings ? (
                                                    <p className="text-xs bg-green-700 text-white rounded-xl px-2 py-1 space-x-1">
                                                        <span>{user.totalBookings}</span>
                                                        <span className="opacity-90">lượt đặt</span>
                                                    </p>
                                                ) : (
                                                    <span className="text-xs text-gray-500">Chưa có</span>
                                                )
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {
                                                formatPrice(user.totalSpent)
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {
                                                user.rate > 0 ? (
                                                    <p>
                                                        <span className="text-xs bg-yellow-500 text-white rounded-xl px-2 py-1">{`${user.rate} / 5`}</span>
                                                        <span>⭐</span>
                                                    </p>
                                                ) : (
                                                    <span className="text-sm text-gray-500">Chưa có</span>
                                                )
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <UserStatus status={user.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                {<User user={user} onSuccess={fetch} />}

                                                {<ActionUser user={user} onSuccess={fetch} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomersPage;