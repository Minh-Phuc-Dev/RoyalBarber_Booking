import { ROLES, USER_STATUS } from "@src/enums/index.js";
import { BookUser, CheckCircle, Users } from "lucide-react";

function UserStatistics({ users }) {

    const data = users.reduce(
        (results, user) => {
            return {
                total: results.total + 1,
                active: user.status === USER_STATUS.ACTIVE.value ? results.active + 1 : results.active,
                staff: user.role === ROLES.STAFF.value ? results.staff + 1 : results.staff,
                customer: user.role === ROLES.CUSTOMER.value ? results.customer + 1 : results.customer
            }
        },
        {
            total: 0,
            active: 0,
            customer: 0,
            staff: 0
        }
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <BookUser className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Tổng tài khoản</p>
                        <p className="text-2xl font-semibold text-gray-900">{data.total}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Nhân viên</p>
                        <p className="text-2xl font-semibold text-gray-900">{data.staff}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Khách Hàng</p>
                        <p className="text-2xl font-semibold text-gray-900">{data.customer}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Đang Hoạt Động</p>
                        <p className="text-2xl font-semibold text-gray-900">{data.active}</p>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default UserStatistics;