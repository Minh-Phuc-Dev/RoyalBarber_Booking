import { useServices } from "@src/hooks/UseServices.jsx";
import MediaService from "@src/services/MediaService";
import { ArrowRight, Palette, Scissors, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedServices = () => {
    const { services, loading, error, fetchServices } = useServices()

    if (loading) {
        return (
            <section className="py-12 md:py-16 lg:py-20 bg-white ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchServices}
                        className="btn-primary"
                    >
                        Thử lại
                    </button>
                </div>
            </section>
        );
    }


    return (
        <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-3 md:mb-4">
                        Dịch Vụ Nổi Bật
                    </h2>
                    <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto px-2 md:px-0">
                        Khám phá các dịch vụ chăm sóc tóc chuyên nghiệp được yêu thích nhất tại Royal Barber
                    </p>
                    <div
                        className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-4 md:mt-6 rounded-full"></div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
                    {services.slice(0, 8).map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={service.id}
                                className="card group overflow-hidden animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >

                                <div className="relative overflow-hidden">
                                    <img
                                        src={MediaService.getMedia(service.image)}
                                        alt={service.name}
                                        className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />


                                    {service.isPopular && (
                                        <div
                                            className="absolute top-3 md:top-4 left-3 md:left-4 bg-primary-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                                            Phổ biến
                                        </div>
                                    )}

                                    {/* Combo Badge */}
                                    {service.isCombo && (
                                        <div
                                            className="absolute top-3 md:top-4 right-3 md:right-4 bg-orange-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                                            Combo
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className="absolute bottom-3 md:bottom-4 right-3 md:right-4 w-10 md:w-12 h-10 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        {
                                            service.category === "HAIRCUT" ? (
                                                <Scissors className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
                                            ) : service.category === "BEARD" ? (
                                                <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
                                            ) : service.category === "COLORING" ? (
                                                <Palette className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
                                            ) : (
                                                <Scissors className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
                                            )
                                        }

                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-6">
                                    <h3 className="text-lg md:text-xl font-bold text-secondary-800 mb-2 group-hover:text-primary-600 transition-colors">
                                        {service.name}
                                    </h3>
                                    <p className="text-secondary-600 text-sm mb-3 md:mb-4 line-clamp-3 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl md:text-2xl font-bold text-primary-600">
                                            {Number(service.price).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </span>
                                        <Link
                                            to="/booking"
                                            className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-semibold transition-colors text-sm md:text-base"
                                        >
                                            <span>Đặt lịch</span>
                                            <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link to="/services"
                        className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center space-x-2">
                        <span>Xem Tất Cả Dịch Vụ</span>
                        <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;