import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AUTHENTICATE_STATUS, useAuthenticate } from "@src/contexts/AuthenticateContext";
import { ROLES } from "@src/enums";
import MediaService from "@src/services/MediaService";
import { BarChart3, Calendar, Scissors, User, Users } from "lucide-react";

import { Link } from "react-router-dom";


const ACTIONS = {
    [ROLES.ADMIN.value]: [
        { name: "Bảng Điều Khiển", href: "/manage/dashboard", icon: BarChart3 },
        { name: "Quản Lý Lịch Hẹn", href: "/manage/appointments", icon: Calendar },
        { name: "Quản Lý Khách Hàng", href: "/manage/customers", icon: Users },
        { name: "Quản Lý Dịch Vụ", href: "/manage/services", icon: Scissors },
        // { name: "Cài Đặt", href: "/manage/settings", icon: Settings },
    ],
    [ROLES.STAFF.value]: [
        { name: "Bảng Điều Khiển", href: "/manage/dashboard", icon: BarChart3 },
        { name: "Quản Lý Lịch Hẹn", href: "/manage/appointments", icon: Calendar },
        // { name: "Cài Đặt", href: "/manage/settings", icon: Settings },
    ],
    [ROLES.CUSTOMER.value]: [
        { name: "Lịch Hẹn Của Tôi", href: "/my-appointments", icon: Calendar },
        { name: "Hồ Sơ Cá Nhân", href: "/profile", icon: User },
        // { name: "Cài Đặt", href: "/settings", icon: Settings },
    ]

}


function Account() {
    const { store, clear } = useAuthenticate();
    const actions = ACTIONS[store.user.role] || [];


    return store.status === AUTHENTICATE_STATUS.AUTHENTICATED ? (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <img className="w-full h-full object-cover" src={MediaService.getMedia(store.user.attributes?.avatar)} alt="User Avatar" />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{store.user.displayName}</p>
                        <p className="text-xs text-gray-500 flex items-center">
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
                                className="lucide lucide-shield w-3 h-3 mr-1"
                                aria-hidden="true"
                            >
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            </svg>
                            <span>{ROLES[store.user.role].name}</span>
                        </p>
                    </div>

                    <div className="w-4 h-4 text-gray-400 transition-transform rotate-180">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>

            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="mt-4">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{store.user.displayName}</p>
                            <p className="text-xs text-gray-500">{store.user.email}</p>
                        </div>
                        {
                            actions.map(
                                (item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        className="flex items-center px-4 py-2 gap-x-2 text-sm text-gray-700 hover:bg-primary-500 hover:text-white transition-colors"
                                        data-discover="true"
                                    >
                                        {<item.icon className="lucide lucide-calendar w-4 h-4" />}
                                        <span>{item.name}</span>

                                    </Link>
                                )
                            )
                        }

                        <div className="border-t border-gray-100 pt-2">
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                onClick={clear}
                            >
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
                                    className="lucide lucide-log-out w-4 h-4 mr-3"
                                    aria-hidden="true"
                                >
                                    <path d="m16 17 5-5-5-5" />
                                    <path d="M21 12H9" />
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                </svg>
                                Đăng Xuất
                            </button>
                        </div>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    ) : null
}

//TODO: Mobile account button


function ActionButton() {
    const { store } = useAuthenticate();
    return (
        <div className="hidden md990:flex items-center space-x-4">
            {
                store.status === AUTHENTICATE_STATUS.AUTHENTICATED ? (
                    <Account />
                ) : (
                    <Link
                        to="/login"
                        className="btn-primary font-semibold flex items-center space-x-2"
                    >
                        <User className="w-4 h-4" />
                        <span>Đăng Nhập</span>
                    </Link>
                )
            }
        </div>

    )
}

export default ActionButton