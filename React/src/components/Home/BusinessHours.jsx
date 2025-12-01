import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const BusinessHours = () => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();
  
  const businessHours = [
    { day: 'Thứ Hai', hours: '8:00 - 20:00', dayIndex: 1 },
    { day: 'Thứ Ba', hours: '8:00 - 20:00', dayIndex: 2 },
    { day: 'Thứ Tư', hours: '8:00 - 20:00', dayIndex: 3 },
    { day: 'Thứ Năm', hours: '8:00 - 20:00', dayIndex: 4 },
    { day: 'Thứ Sáu', hours: '8:00 - 20:00', dayIndex: 5 },
    { day: 'Thứ Bảy', hours: '8:00 - 20:00', dayIndex: 6 },
    { day: 'Chủ Nhật', hours: '8:00 - 20:00', dayIndex: 0 }
  ];

  const isOpen = currentHour >= 8 && currentHour < 20;
  const isToday = (dayIndex) => dayIndex === currentDay;

  return (
    <div className="card p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
          <Clock className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-secondary-800">Giờ Hoạt Động</h3>
          <div className="flex items-center space-x-2 mt-1">
            {isOpen ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-600 font-semibold">Đang mở cửa</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-semibold">Đã đóng cửa</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hours List */}
      <div className="space-y-3">
        {businessHours.map((schedule) => (
          <div
            key={schedule.day}
            className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
              isToday(schedule.dayIndex)
                ? 'bg-primary-50 border-l-4 border-primary-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <span className={`font-medium ${
              isToday(schedule.dayIndex) ? 'text-primary-700' : 'text-secondary-700'
            }`}>
              {schedule.day}
            </span>
            <span className={`font-semibold ${
              isToday(schedule.dayIndex) ? 'text-primary-600' : 'text-secondary-600'
            }`}>
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-secondary-800 mb-2">Lưu Ý:</h4>
        <ul className="text-sm text-secondary-600 space-y-1">
          <li>• Nhận khách đến 19:30 (30 phút trước giờ đóng cửa)</li>
          <li>• Nghỉ lễ Tết theo quy định của nhà nước</li>
          <li>• Có thể thay đổi giờ hoạt động vào các ngày đặc biệt</li>
        </ul>
      </div>

      {/* Emergency Contact */}
      <div className="mt-4 text-center">
        <p className="text-sm text-secondary-600">
          Cần hỗ trợ khẩn cấp? Gọi{' '}
          <a href="tel:0347206121" className="text-primary-600 font-semibold hover:underline">
            0347 206 121
          </a>
        </p>
      </div>
    </div>
  );
};

export default BusinessHours;