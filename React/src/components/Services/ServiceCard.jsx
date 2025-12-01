import MediaService from '@src/services/MediaService';
import { ArrowRight, Clock, Crown, Palette, Scissors, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, onViewDetails, animationDelay = 0 }) => {
  const getServiceIcon = (category) => {
    const iconMap = {
      'Tạo Kiểu': Scissors,
      'Chăm Sóc': Sparkles,
      'Nhuộm Tóc': Palette,
      'Combo Nổi Bật': Crown,
      'default': Scissors
    };
    return iconMap[category] || iconMap.default;
  };

  const IconComponent = getServiceIcon(service.category);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div
      className="card group overflow-hidden animate-slide-up"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={MediaService.getMedia(service.image)}
          alt={service.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Popular Badge */}
        {service.isPopular && (
          <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Phổ biến
          </div>
        )}

        {/* Combo Badge */}
        {service.isCombo && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Combo
          </div>
        )}

        {/* Icon */}
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-secondary-800 group-hover:text-primary-600 transition-colors">
            {service.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-600">{service.rating}</span>
          </div>
        </div>

        <p className="text-secondary-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Service Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{service.duration} phút</span>
          </div>
          <span className="text-sm text-gray-500">{service.reviews} đánh giá</span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(service.price)}
          </span>
          <div className="flex space-x-2">
            <Link
              to="/booking"
              className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-semibold transition-colors text-sm"
            >
              <span>Đặt lịch</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;