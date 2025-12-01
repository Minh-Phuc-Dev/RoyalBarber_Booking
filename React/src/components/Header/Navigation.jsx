import ActionButton from "@src/components/Header/ActionButton";
import { AUTHENTICATE_STATUS, useAuthenticate } from "@src/contexts/AuthenticateContext";
import { ROLES } from "@src/enums";
import { Calendar, Home, Info, Phone, Scissors } from "lucide-react";
import { useMemo } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";




const Navigation = () => {
    const { store } = useAuthenticate();
    const location = useLocation()

    const LINKS = useMemo(
        () => {

            if (store.status !== AUTHENTICATE_STATUS.AUTHENTICATED) {
                return [
                    { name: "Trang Chủ", href: "/", icon: Home },
                    { name: "Dịch Vụ", href: "/services", icon: Scissors },
                    { name: "Đặt Lịch", href: "/booking", icon: Calendar },
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


    return (
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


                    <nav className="hidden md990:flex items-center space-x-8">
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


                </div>
            </div>


        </header >
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