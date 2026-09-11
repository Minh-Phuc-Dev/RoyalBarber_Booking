import ServiceCard from "@src/components/Services/ServiceCard.jsx";
import ServiceModal from "@src/components/Services/ServiceModal.jsx";
import { SERVICE_CATEGORIES } from "@src/constants/index.js";
import { useAvailableServices } from "@src/hooks/UseAvailableServices";
import { isEmpty } from "lodash";
import { Crown, Filter, Heart, Palette, Search, Sparkles, Users } from 'lucide-react';
import { useMemo, useState } from 'react';



const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ id: 'ALL', name: 'Tất Cả Mức Giá', min: 0, max: Infinity });
    const { services: data, loading, error, fetchServices } = useAvailableServices()

    const services = useMemo(
        () => {
            let services = data.map(
                service => ({
                    ...service,
                    icon: service.icon || Users
                })
            )

            if (!isEmpty(selectedCategory)) {
                services = services.filter(service => service.category === selectedCategory)
            }

            if (!isEmpty(searchTerm)) {
                services = services.filter(service =>
                    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    service.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }

            if (priceRange && priceRange.min !== 0 || priceRange.max !== Infinity) {
                services = services.filter(service =>
                    service.price >= priceRange.min && service.price <= priceRange.max
                )
            }

            return services

        }, [data, selectedCategory, searchTerm, priceRange]
    )

    const categories = [
        { id: "", name: 'Tất Cả', icon: Users },
        { id: SERVICE_CATEGORIES.STYLING.value, name: SERVICE_CATEGORIES.STYLING.name, icon: Sparkles },
        { id: SERVICE_CATEGORIES.TREATMENT.value, name: SERVICE_CATEGORIES.TREATMENT.name, icon: Heart },
        { id: SERVICE_CATEGORIES.COLORING.value, name: SERVICE_CATEGORIES.COLORING.name, icon: Palette },
        { id: SERVICE_CATEGORIES.SPECIAL_COMBO.value, name: SERVICE_CATEGORIES.SPECIAL_COMBO.name, icon: Crown }
    ];

    const priceRanges = [
        { id: 'ALL', name: 'Tất Cả Mức Giá', min: 0, max: Infinity },
        { id: 'UNDER_200', name: 'Dưới 200.000đ', min: 0, max: 200000 },
        { id: '200_TO_400', name: '200.000đ - 400.000đ', min: 200000, max: 400000 },
        { id: 'ABOVE_400', name: 'Trên 400.000đ', min: 400000, max: Infinity }
    ];


    const handleViewDetails = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-4">
                            Dịch Vụ Royal Barber
                        </h1>
                        <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto">
                            Khám phá đầy đủ các dịch vụ chăm sóc tóc chuyên nghiệp với chất lượng cao nhất
                        </p>
                        <div
                            className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Loading Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="h-48 bg-gray-200 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-4">
                        Dịch Vụ Royal Barber
                    </h1>
                    <div
                        className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-6 rounded-full mb-8"></div>
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Lỗi</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={fetchServices}
                            className="btn-primary"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-4">
                        Dịch Vụ Royal Barber
                    </h1>
                    <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto">
                        Khám phá đầy đủ các dịch vụ chăm sóc tóc chuyên nghiệp với chất lượng cao nhất
                    </p>
                    <div
                        className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Search */}
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm dịch vụ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <select
                                value={priceRange.id}
                                onChange={
                                    (event) => {
                                        const selectedId = event.target.value;
                                        const selectedRange = priceRanges.find(range => range.id === selectedId);
                                        setPriceRange(selectedRange);
                                    }
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.id} value={range.id}>
                                        {range.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {categories.map(category => {
                        const IconComponent = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category.id
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600'
                                    }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                <span className="text-sm">{category.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-secondary-600">
                        Hiển thị <span className="font-semibold text-primary-600">{services.length}</span> dịch
                        vụ
                        {searchTerm && (
                            <span> cho từ khóa "<span className="font-semibold">{searchTerm}</span>"</span>
                        )}
                    </p>
                </div>

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onViewDetails={() => handleViewDetails(service)}
                                animationDelay={index * 0.1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div
                            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                            Không tìm thấy dịch vụ
                        </h3>
                        <p className="text-secondary-600 mb-4">
                            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm dịch vụ
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory(categories.at(0).id);
                                setPriceRange(priceRanges.at(0));
                            }}
                            className="btn-primary"
                        >
                            Xóa Bộ Lọc
                        </button>
                    </div>
                )}

                {/* Service Modal */}
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default ServicesPage;