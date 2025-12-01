import { AUTHENTICATE_STATUS, useAuthenticate } from '@src/contexts/AuthenticateContext';
import {
    Bell,
    Calendar,
    ChevronDown,
    Gift,
    Home,
    LogOut,
    Menu,
    Scissors,
    Search,
    Settings,
    TrendingUp,
    User,
    Users,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';


const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { store, setStore } = useAuthenticate();


    const handleLogout = () => {
        setStore(
            {
                user: null,
                status: AUTHENTICATE_STATUS.UNAUTHENTICATED
            }
        )
        navigate("/");
    };

    const navigation = [
        { name: 'Bảng Điều Khiển', href: '/manage/dashboard', icon: Home, badge: null },
        { name: 'Lịch Hẹn', href: '/manage/appointments', icon: Calendar, badge: null },
        { name: 'Khách Hàng', href: '/manage/customers', icon: Users, badge: null },
        { name: 'Quản Lý Tài Khoản', href: '/manage/users', icon: User, badge: null },
        { name: 'Dịch Vụ', href: '/manage/services', icon: Scissors, badge: null },
        { name: 'Khuyến Mãi', href: '/manage/promotions', icon: Gift, badge: null },
        { name: 'Báo Cáo', href: '/manage/reports', icon: TrendingUp, badge: null },
        { name: 'Cài Đặt', href: '/manage/settings', icon: Settings, badge: null },
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <div className="min-h-screen flex bg-[#FAFBFC]">
            {/* Sidebar - Fixed on mobile, static on desktop */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-gray-900 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">RB</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Royal Barber</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-6 px-4">
                    <div className="space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.href) ? 'bg-[#FF8800] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                    {/* Divider and Home link */}
                    <div className="my-6">
                        <hr className="border-t border-gray-200" />
                        <Link
                            to="/"
                            className="flex items-center mt-6 px-4 py-3 text-sm font-semibold rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#FF8800] transition-colors"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Home className="w-5 h-5 mr-3 text-gray-700" />
                            Về Trang Chủ
                        </Link>
                    </div>
                </nav>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#FF8800] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{store.user?.name}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content - No padding-left on desktop since sidebar is static */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <div className="w-full bg-white shadow-sm border-b border-gray-200 flex items-center justify-between h-16 px-8">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative text-gray-500 hover:text-gray-700">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
                            >
                                <div className="w-10 h-10 bg-[#FF8800] rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">{store.user?.name}</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{store.user?.name}</p>
                                        <p className="text-xs text-gray-500">Administrator</p>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-8 bg-[#FAFBFC]">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;