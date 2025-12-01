import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';

const LocationSection = () => {
  const handleGetDirections = () => {
    const address = "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="card p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-secondary-800">Vị Trí Salon</h3>
          <p className="text-secondary-600">Dễ dàng tìm đường đến salon</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative mb-6 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Salon Location"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <button
            onClick={handleGetDirections}
            className="bg-white/90 backdrop-blur-sm text-secondary-800 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors flex items-center space-x-2"
          >
            <Navigation className="w-5 h-5" />
            <span>Xem Bản Đồ</span>
          </button>
        </div>
      </div>

      {/* Address Info */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-secondary-800">Địa Chỉ:</p>
            <p className="text-secondary-600">123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-secondary-800">Điện Thoại:</p>
            <a href="tel:0123456789" className="text-primary-600 hover:underline">
              0347 206 121
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-secondary-800">Email:</p>
            <a href="mailto:info@royalbarber.vn" className="text-primary-600 hover:underline">
              info@royalbarber.vn
            </a>
          </div>
        </div>
      </div>

      {/* Transportation */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-semibold text-primary-800 mb-2">Phương Tiện Di Chuyển:</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Xe bus: Tuyến 18, 53, 88 (Dừng Nguyễn Văn Linh)</li>
          <li>• Xe máy: Có chỗ gửi xe miễn phí</li>
          <li>• Ô tô: Bãi đỗ xe rộng rãi</li>
          <li>• Grab/Taxi: Dễ dàng đặt xe đến salon</li>
        </ul>
      </div>

      {/* Directions Button */}
      <button
        onClick={handleGetDirections}
        className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
      >
        <Navigation className="w-5 h-5" />
        <span>Chỉ Đường</span>
      </button>
    </div>
  );
};

export default LocationSection;