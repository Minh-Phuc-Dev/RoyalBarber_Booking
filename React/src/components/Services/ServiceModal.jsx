import React from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Clock, CheckCircle, ArrowRight, Users } from 'lucide-react';

const ServiceModal = ({ service, onClose }) => {
  const IconComponent = service.icon || Users;
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="relative">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Service icon */}
            <div className="absolute bottom-4 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-primary-600" />
            </div>

            {/* Popular badge */}
            {service.popular && (
              <div className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Phổ biến
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-secondary-800 mb-2">
                  {service.name}
                </h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-800">{service.rating}</span>
                    <span className="text-gray-500">({service.reviews} đánh giá)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration} phút</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {formatPrice(service.price)}
                </div>
                <p className="text-sm text-gray-500">Giá đã bao gồm VAT</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">Mô Tả Dịch Vụ</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">Bao Gồm</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Info */}
              <div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-secondary-800 mb-4">Thông Tin Đặt Lịch</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-semibold">{service.duration} phút</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giá dịch vụ:</span>
                      <span className="font-semibold">{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đánh giá:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{service.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to="/booking"
                      className="w-full btn-primary text-center py-4 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Đặt Lịch Ngay</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full btn-secondary text-center py-4"
                    >
                      Tư Vấn Miễn Phí
                    </Link>
                  </div>

                  <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700">
                      <strong>Lưu ý:</strong> Vui lòng đến sớm 10 phút để làm thủ tục. 
                      Chúng tôi sẽ gọi điện xác nhận lịch hẹn trước 1 giờ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;