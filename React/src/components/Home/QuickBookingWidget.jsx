import { useAvailableServices } from "@src/hooks/UseAvailableServices";
import { isEmpty } from "lodash";
import { ArrowRight, Calendar, Clock, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from "sonner";

const QuickBookingWidget = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        time: '',
        name: '',
        phone: ''
    });
    const { services, loading } = useAvailableServices();


    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00'
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
    };

    useEffect(() => {
        const hash = location.hash
        if (isEmpty(hash)) {
            return
        }

        setTimeout(
            () => {
                const element = document.querySelector(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }

            }, 1000
        )


    }, [location.hash])

    if (loading) {
        return (
            <section className="py-12 md:py-16 lg:py-20 bg-secondary-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="text-white order-2 lg:order-1">
                            <div
                                className="inline-flex items-center space-x-2 bg-primary-500/20 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
                                <Calendar className="w-4 md:w-5 h-4 md:h-5 text-primary-400" />
                                <span
                                    className="text-primary-300 font-semibold text-sm md:text-base">Đặt Lịch Nhanh</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                                Đặt Lịch Chỉ Trong
                                <span className="text-primary-400 block">30 Giây</span>
                            </h2>
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-64 mb-6"></div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-gray-300 rounded w-40"></div>
                                    <div className="h-3 bg-gray-300 rounded w-44"></div>
                                    <div className="h-3 bg-gray-300 rounded w-36"></div>
                                </div>
                            </div>
                        </div>
                        <div className="card p-6 md:p-8 bg-white order-1 lg:order-2">
                            <div className="animate-pulse space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-32"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="quick-book" className="py-12 md:py-16 lg:py-20 bg-secondary-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-pattern opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white order-2 lg:order-1">
                        <div
                            className="inline-flex items-center space-x-2 bg-primary-500/20 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
                            <Calendar className="w-4 md:w-5 h-4 md:h-5 text-primary-400" />
                            <span className="text-primary-300 font-semibold text-sm md:text-base">Đặt Lịch Nhanh</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                            Đặt Lịch Chỉ Trong
                            <span className="text-primary-400 block">30 Giây</span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                            Hệ thống đặt lịch thông minh giúp bạn chọn thời gian phù hợp và nhận xác nhận ngay lập tức
                        </p>

                        {/* Features */}
                        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-7 md:w-8 h-7 md:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                                <span
                                    className="text-gray-300 text-sm md:text-base">Xác nhận lịch hẹn trong 5 phút</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-7 md:w-8 h-7 md:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                    <User className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm md:text-base">Chọn stylist yêu thích</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-7 md:w-8 h-7 md:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                    <Phone className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm md:text-base">Nhắc nhở qua SMS trước 1 giờ</span>
                            </div>
                        </div>

                        <Link to="/booking"
                            className="btn-secondary inline-flex items-center space-x-2 text-sm md:text-base">
                            <span>Đặt Lịch Chi Tiết</span>
                            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                        </Link>
                    </div>

                    {/* Right - Booking Form */}
                    <div className="card p-6 md:p-8 bg-white order-1 lg:order-2">
                        <h3 className="text-xl md:text-2xl font-bold text-secondary-800 mb-4 md:mb-6 text-center">
                            Đặt Lịch Nhanh
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            {/* Service Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                                    Chọn Dịch Vụ
                                </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                                    required
                                >
                                    <option value="">Chọn dịch vụ</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.name}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                                    Chọn Ngày
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                                    required
                                />
                            </div>

                            {/* Time Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                                    Chọn Giờ
                                </label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                                    required
                                >
                                    <option value="">Chọn giờ</option>
                                    {timeSlots.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                                        Họ Tên
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Nhập họ tên"
                                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                                        Số Điện Thoại
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại"
                                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm md:text-base"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full btn-primary text-base md:text-lg py-3 md:py-4 flex items-center justify-center space-x-2"
                            >
                                <Calendar className="w-4 md:w-5 h-4 md:h-5" />
                                <span>Xác Nhận Đặt Lịch</span>
                            </button>
                        </form>

                        <p className="text-xs text-secondary-500 text-center mt-3 md:mt-4">
                            * Chúng tôi sẽ gọi điện xác nhận lịch hẹn trong vòng 5 phút
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickBookingWidget;