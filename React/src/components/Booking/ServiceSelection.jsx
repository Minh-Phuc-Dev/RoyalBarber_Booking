import MediaService from "@services/MediaService.js";
import { SERVICE_CATEGORIES } from '@src/constants';
import { USER_STATUS } from "@src/enums";
import { useAvailableServices } from "@src/hooks/UseAvailableServices";
import { useStaff } from '@src/hooks/UseBookingStaff';
import { formatPrice } from "@utils";
import { isEmpty } from 'lodash';
import { CheckCircle, Crown, Heart, Palette, Sparkles, Users } from 'lucide-react';
import { useMemo, useState, } from 'react';
import { twMerge } from "tailwind-merge";


const ServiceSelection = ({ booking, onServiceSelect, onStaffSelect }) => {

    const [searchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange] = useState({ id: 'ALL', name: 'Tất Cả Mức Giá', min: 0, max: Infinity });
    const { services: data, loading, error } = useAvailableServices()
    const { staff, loading: loadingStaff } = useStaff();

    const services = useMemo(
        () => {
            let services = data

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


    const handleServiceSelect = (service) => {
        onServiceSelect(service);
    };


    return (
        <div className="space-y-8 p-6">
            {/* Service Selection */}
            <div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-6">Chọn Dịch Vụ</h3>


                <div className="flex flex-wrap gap-2 mb-6">
                    {
                        categories.map(
                            category => {
                                const Icon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category.id ? 'bg-primary-500 text-white shadow-lg' : 'bg-gray-100 text-secondary-600 hover:bg-primary-50 hover:text-primary-600'}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{category.name}</span>
                                    </button>
                                );
                            }
                        )
                    }
                </div>

                {
                    loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow p-4">
                                    <div className="flex space-x-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                                            <div className="flex justify-between">
                                                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Thử lại
                            </button>
                        </div>
                    ) : services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                services.map(
                                    (service) => {

                                        const isSelected = booking?.service?.id === service.id;

                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => handleServiceSelect(service)}
                                                className={
                                                    twMerge(
                                                        "card p-4 cursor-pointer transition-all duration-200",
                                                        isSelected ? "ring-2 ring-primary-500 bg-primary-50" : "hover:shadow-lg"
                                                    )
                                                }
                                            >
                                                <div className="flex space-x-4">
                                                    <img
                                                        src={MediaService.getMedia(service.image)}
                                                        alt={service.name}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="font-semibold text-secondary-800">{service.name}</h4>
                                                            <div className="flex gap-1">
                                                                {
                                                                    isSelected ? (
                                                                        <CheckCircle className="w-5 h-5 text-primary-500" />
                                                                    ) : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
                                                            {service.description}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-primary-600">
                                                                {formatPrice(service.price)}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {service.duration} phút
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            }
                        </div>
                    ) : (
                        <p className="p-5 text-center opacity-50">Hiện tại không có dịch vụ nào khả dụng.</p>
                    )
                }
            </div>

            {
                loadingStaff ? (
                    <p>Đang tải nhân viên khả dụng...</p>
                ) : (
                    <div>
                        <h3 className="text-2xl font-bold text-secondary-800 mb-6">Chọn Nhân Viên</h3>

                        {
                            staff.length > 0 ? (
                                <ul className="gap-5 grid grid-cols-1 md:grid-cols-2">
                                    {
                                        staff.filter(
                                            member => member.status === USER_STATUS.ACTIVE.value
                                        ).map(
                                            member => (
                                                <li key={member.id}
                                                    onClick={
                                                        () => {
                                                            onStaffSelect(member)
                                                        }
                                                    }

                                                    className={
                                                        twMerge(
                                                            "flex gap-x-2 border border-gray-200 rounded-md p-3 cursor-pointer transition-all duration-200",
                                                            member.id === booking.staff?.id ? "ring-2 ring-primary-500 bg-primary-50" : "hover:shadow-lg"
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={MediaService.getMedia(member.attributes.avatar)}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                        alt={member.displayName}

                                                    />

                                                    <div className="grow">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold">{member.displayName}</p>

                                                            {
                                                                member.id === booking.style?.id ? (
                                                                    <CheckCircle className="w-5 h-5 text-primary-500" />
                                                                ) : null
                                                            }

                                                        </div>
                                                        <p className="text-xs font-medium text-green-500">Sẵn sàng</p>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            ) : (
                                <p>Không có nhân viên nào khả dụng vào thời gian đã chọn.</p>
                            )
                        }
                    </div>
                )
            }


        </div>
    );
};

export default ServiceSelection;