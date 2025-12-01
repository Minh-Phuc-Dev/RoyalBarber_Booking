import PromotionService from "@services/PromotionService.js";
import { formatDay, formatPrice } from "@src/utils";
import { ArrowRight, Clock, Gift, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PromotionsSection = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPromotions = async () => {

            setLoading(true);
            const { payload, success } = await PromotionService.getAvailablePromotions();

            if (success) {
                setPromotions(payload);

            } else {
                setError("Không thể tải khuyến mãi vào lúc này. Vui lòng thử lại sau.");
            }
            setLoading(false);

        };

        fetchPromotions();
    }, []);

    if (loading) {
        return (
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
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
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Thử lại
                    </button>
                </div>
            </section>
        );
    }

    if (promotions.length === 0) {
        return (
            <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-3 md:px-4 py-2 mb-3 md:mb-4">
                        <Gift className="w-4 md:w-5 h-4 md:h-5 text-primary-600" />
                        <span className="text-primary-700 font-semibold text-sm md:text-base">Ưu Đãi Đặc Biệt</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-3 md:mb-4">
                        Khuyến Mãi Hot
                    </h2>
                    <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto px-2 md:px-0 mb-8">
                        Hiện tại chưa có chương trình khuyến mãi nào. Hãy quay lại sau!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-3 md:px-4 py-2 mb-3 md:mb-4">
                        <Gift className="w-4 md:w-5 h-4 md:h-5 text-primary-600" />
                        <span className="text-primary-700 font-semibold text-sm md:text-base">Ưu Đãi Đặc Biệt</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-3 md:mb-4">
                        Khuyến Mãi Hot
                    </h2>
                    <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto px-2 md:px-0">
                        Đừng bỏ lỡ những ưu đãi hấp dẫn dành riêng cho bạn
                    </p>
                </div>

                {/* Promotions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                    {promotions.map((promotion, index) => (
                        <div
                            key={promotion.id}
                            className={`card group overflow-hidden animate-slide-up ${promotion.featured ? 'md:col-span-2 lg:col-span-2' : ''
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`relative ${promotion.featured ? 'md:flex' : ''}`}>
                                {/* Image */}
                                <div className={`relative overflow-hidden ${promotion.featured ? 'md:w-1/2' : 'w-full'
                                    }`}>
                                    <img
                                        src="/images/promotion.jpg"
                                        alt={promotion.title}
                                        className="w-full h-40 md:h-48 lg:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    {/* Discount Badge */}
                                    <div className="absolute top-3 left-3  bg-primary-500 text-white px-3 py-0.5 rounded-full">
                                        <span className="font-bold text-sm">- {formatPrice(promotion.value)}</span>
                                    </div>

                                    {/* Code Badge */}
                                    {promotion.code && (
                                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold">
                                            Code: {promotion.code}
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {promotion.featured && (
                                        <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-yellow-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center space-x-1">
                                            <Star className="w-3 md:w-4 h-3 md:h-4 fill-current" />
                                            <span>Hot</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`p-4 md:p-6 ${promotion.featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
                                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary-800 mb-2 md:mb-3 group-hover:text-primary-600 transition-colors">
                                        {promotion.title}
                                    </h3>
                                    <p className="text-secondary-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                                        {promotion.description}
                                    </p>

                                    {/* Validity */}
                                    <div className="flex items-center space-x-2 mb-2 md:mb-3">
                                        <Clock className="w-3 md:w-4 h-3 md:h-4 text-primary-600" />
                                        <span className="text-xs md:text-sm text-secondary-600">
                                            Có hiệu lực đến: <span className="font-semibold text-primary-600">{formatDay(promotion.endDate)}</span>
                                        </span>
                                    </div>

                                    {/* Terms */}
                                    <p className="text-xs text-secondary-500 mb-3 md:mb-4 italic">
                                        Giảm ngay {formatPrice(promotion.value)}. Nhanh tay kẻo lỡ!
                                    </p>

                                    {/* CTA */}
                                    <Link
                                        to="/booking"
                                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors text-sm md:text-base"
                                    >
                                        <span>Đặt lịch ngay</span>
                                        <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Nhận Thông Báo Khuyến Mãi</h3>
                    <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
                        Đăng ký để nhận thông báo về các chương trình khuyến mãi mới nhất
                    </p>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-4 py-3 rounded-lg text-secondary-800 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                        />
                        <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;