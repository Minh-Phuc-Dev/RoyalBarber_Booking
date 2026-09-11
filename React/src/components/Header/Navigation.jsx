import ActionButton from "@src/components/Header/ActionButton";
import { AUTHENTICATE_STATUS, useAuthenticate } from "@src/contexts/AuthenticateContext";
import { ROLES } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import { Calendar, Home, Info, LogOut, Menu, Phone, Scissors, User, X } from "lucide-react";
import { useMemo } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";




const Navigation = () => {
    const location = useLocation()
    const { store, clear } = useAuthenticate()

    const LINKS = useMemo(
        () => {

            if (store.status !== AUTHENTICATE_STATUS.AUTHENTICATED) {
                return [
                    { name: "Trang Chủ", href: "/", icon: Home },
                    { name: "Dịch Vụ", href: "/services", icon: Scissors },
                    { name: "Đặt Lịch", href: "/#quick-book", icon: Calendar },
                    { name: "Về Chúng Tôi", href: "/about", icon: Info },
                    { name: "Liên Hệ", href: "/contact", icon: Phone },
                ]
            }

            if (store.user.role === ROLES.CUSTOMER.value) {
                return [
                    { name: "Trang Chủ", href: "/", icon: Home },
                    { name: "Dịch Vụ", href: "/services", icon: Scissors },
                    { name: "Đặt Lịch", href: "/booking", icon: Calendar },
                    { name: "Lịch Hẹn Của Tôi", href: "/my-appointments", icon: Calendar },
                    { name: "Về Chúng Tôi", href: "/about", icon: Info },
                    { name: "Liên Hệ", href: "/contact", icon: Phone },
                ]
            }

            return [
                { name: "Trang Chủ", href: "/", icon: Home },
                { name: "Dịch Vụ", href: "/services", icon: Scissors },
                { name: "Đặt Lịch", href: "/booking", icon: Calendar },
                { name: "Quản Lý Lịch Hẹn", href: "/manage/appointments", icon: Calendar },
                { name: "Về Chúng Tôi", href: "/about", icon: Info },
                { name: "Liên Hệ", href: "/contact", icon: Phone },
            ]

        }, [store]
    )

    const [isMenuOpen, setIsMenuOpen] = useBoolean(false)







    return (
        <>
            <header className={"sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg"}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">

                        <Link to="/" className="relative flex items-center space-x-3 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shine"></div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-gray-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">RB</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-secondary-800">Royal Barber</h1>
                                <p className="text-sm text-secondary-600">Chuyên nghiệp & Đẳng cấp</p>
                            </div>
                        </Link>


                        <nav className="hidden md:flex items-center space-x-8">
                            {
                                LINKS.map(
                                    (item) => {
                                        const active = matchPath(item.href, location.pathname);
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={
                                                    twMerge(
                                                        "font-medium transition-colors duration-200",
                                                        active ? "text-primary-600 border-b-2 border-primary-600 pb-1" : "text-secondary-700 hover:text-primary-600"
                                                    )
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    }
                                )
                            }
                        </nav>


                        <ActionButton />
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={setIsMenuOpen.toggle}
                        >
                            {
                                isMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )
                            }
                        </button>

                    </div>
                </div>


            </header >
            {
                isMenuOpen ? (
                    <div className="fixed top-0 z-30 left-0 w-fit overflow-auto md:hidden bg-white border-t border-gray-200 shadow-lg">
                        <div className="mt-24 w-screen overflow-hidden">

                            <div className="space-y-2">
                                {
                                    LINKS.map(
                                        (item) => {
                                            const active = matchPath(item.href, location.pathname);
                                            const Icon = item.icon

                                            return (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    onClick={setIsMenuOpen.toggle}
                                                    className={
                                                        twMerge(
                                                            "flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors",
                                                            active ? "text-primary-600 bg-primary-50" : "text-secondary-700 hover:text-primary-600 hover:bg-gray-50"
                                                        )
                                                    }
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span>{item.name}</span>


                                                </Link>
                                            );
                                        }
                                    )
                                }
                            </div>




                            <div className="py-7 border-t border-gray-100">
                                {
                                    store.status === AUTHENTICATE_STATUS.AUTHENTICATED ? (
                                        <div className="space-y-2">
                                            <div className="px-3 py-2">
                                                <p className="text-sm font-medium text-gray-900">{store.user.displayName}</p>
                                                <p className="text-xs text-gray-500">{store.user.email}</p>
                                            </div>
                                            <button
                                                onClick={clear}
                                                className="w-full flex items-center justify-center px-3 py-2 text-white bg-primary-500 hover:bg-primary-400 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Đăng Xuất
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            onClick={setIsMenuOpen.toggle}
                                            to="/login"
                                            className="w-full x-3 py-4 text-white bg-primary-500 inline-flex items-center justify-center gap-2 font-semibold"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Đăng Nhập</span>
                                        </Link>
                                    )}
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default Navigation





// {/* Login Modal */}
// <LoginModal
//     isOpen={isLoginOpen}
//     onClose={() => setIsLoginOpen(false)}
//     onSwitchToRegister={() => {
//         setIsLoginOpen(false);
//         setIsRegisterOpen(true);
//     }}
// />

// <RegisterModal
//     isOpen={isRegisterOpen}
//     onClose={() => setIsRegisterOpen(false)}
//     onSwitchToLogin={handleSwitchToLogin}
// />