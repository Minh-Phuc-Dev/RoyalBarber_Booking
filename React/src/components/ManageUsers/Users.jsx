import CreateUser from "@components/ManageUsers/CreateUser.jsx";
import UserStatistics from "@components/ManageUsers/UserStatistics.jsx";
import MediaService from "@services/MediaService.js";
import ActionUser from "@src/components/ManageUsers/ActionUser";
import User from "@src/components/ManageUsers/User";
import { ROLES, USER_STATUS } from "@src/enums/index.js";
import useBoolean from "@src/hooks/UseBoolean";
import { useUsers } from "@src/hooks/UseUsers.jsx";
import { formatDate } from "@utils";
import { isEmpty } from "lodash";
import { Ban, CheckCircle, Mail, Plus, Search } from "lucide-react";
import React, { useMemo } from 'react';

export function UserStatus({ status }) {

    if (status === USER_STATUS.ACTIVE.value) {
        return (
            <p
                className="inline-flex items-center px-2.5 space-x-1 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium"
            >
                <CheckCircle className="w-3 h-3" />
                <span>{USER_STATUS.ACTIVE.name}</span>
            </p>
        );
    }

    if (status === USER_STATUS.SUSPENDED.value) {
        return (
            <p
                className="inline-flex items-center px-2.5 space-x-1 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-medium"
            >
                <Ban className="w-3 h-3 mr-1" />
                <span>{USER_STATUS.SUSPENDED.name}</span>
            </p>
        )
    }
    return (
        <p
            className="inline-flex items-center px-2.5 space-x-1 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
        >
            <span>{status}</span>
        </p>
    )
}

export function UserRole({ role }) {
    if (role === ROLES.ADMIN.value) {
        return (
            <p
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium"
            >
                <span>{ROLES.ADMIN.name}</span>
            </p>
        );
    }
    if (role === ROLES.STAFF.value) {
        return (
            <p
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium"
            >
                <span>{ROLES.STAFF.name}</span>
            </p>
        );
    }

    return (
        <p
            className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"
        >
            <span>{ROLES.CUSTOMER.name}</span>
        </p>
    );

}

function Users() {

    const [search, setSearch] = React.useState("");
    const [role] = React.useState("");
    const [status, setStatus] = React.useState("");

    const [create, setCreate] = useBoolean(false);

    const { users: data, fetch } = useUsers()

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
        <>
            <UserStatistics users={data} />

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
                                Liên hệ
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vai trò
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
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <UserRole role={user.role} />
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
        </>
    );
}

export default Users;