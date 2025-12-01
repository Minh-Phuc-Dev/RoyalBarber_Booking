import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Scissors, Save, Phone, Mail } from 'lucide-react';

const AppointmentModal = ({ isOpen, onClose, appointment = null, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceId: '',
    date: '',
    time: '',
    duration: '30',
    status: 'confirmed',
    notes: ''
  });

  const [services, setServices] = useState([
    { id: '1', name: 'Classic Cut', price: '180.000 ₫', duration: '45 phút' },
    { id: '2', name: 'Modern Fade', price: '220.000 ₫', duration: '60 phút' },
    { id: '3', name: 'Beard Styling', price: '150.000 ₫', duration: '30 phút' },
    { id: '4', name: 'Premium Package', price: '350.000 ₫', duration: '90 phút' },
    { id: '5', name: 'Hair Wash & Style', price: '120.000 ₫', duration: '30 phút' },
    { id: '6', name: 'Kids Haircut', price: '100.000 ₫', duration: '30 phút' }
  ]);

  useEffect(() => {
    if (appointment) {
      setFormData({
        customerName: appointment.customerName || '',
        customerPhone: appointment.customerPhone || '',
        customerEmail: appointment.customerEmail || '',
        serviceId: appointment.serviceId || '',
        date: appointment.date || '',
        time: appointment.time || '',
        duration: appointment.duration || '30',
        status: appointment.status || 'confirmed',
        notes: appointment.notes || ''
      });
    } else {
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        serviceId: '',
        date: '',
        time: '',
        duration: '30',
        status: 'confirmed',
        notes: ''
      });
    }
  }, [appointment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    const selectedService = services.find(s => s.id === serviceId);
    
    setFormData(prev => ({
      ...prev,
      serviceId,
      duration: selectedService ? selectedService.duration.replace(/[^\d]/g, '') : '30'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedService = services.find(s => s.id === formData.serviceId);
    
    const appointmentData = {
      ...formData,
      serviceName: selectedService?.name || '',
      servicePrice: selectedService?.price || '',
      duration: `${formData.duration} phút`
    };

    onSave(appointmentData);
    onClose();
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const statusOptions = [
    { value: 'confirmed', label: 'Xác nhận', color: 'bg-green-50 text-green-600' },
    { value: 'pending', label: 'Chờ xác nhận', color: 'bg-yellow-50 text-yellow-600' },
    { value: 'cancelled', label: 'Đã hủy', color: 'bg-red-50 text-red-600' },
    { value: 'completed', label: 'Hoàn thành', color: 'bg-blue-50 text-blue-600' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-[#FF8800]" />
              {appointment ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn mới'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Thông tin khách hàng */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Thông tin khách hàng
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    placeholder="Nhập họ và tên khách hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    placeholder="0123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Thông tin dịch vụ */}        
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Scissors className="w-5 h-5 mr-2" />
                Thông tin dịch vụ
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dịch vụ <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleServiceChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                >
                  <option value="">Chọn dịch vụ</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price} ({service.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Ngày <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Giờ <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  >
                    <option value="">Chọn giờ</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời lượng (phút)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="15"
                    max="240"
                    step="15"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Trạng thái và Ghi chú */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="Ghi chú thêm về lịch hẹn"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {appointment ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;