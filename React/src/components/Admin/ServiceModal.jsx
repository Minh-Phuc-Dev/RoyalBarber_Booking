import React, { useState, useEffect } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { serviceServiceBackup, SERVICE_CATEGORIES } from '@services/serviceService.backup.js';

const ServiceModal = ({ isOpen, onClose, service = null, onSave, categories = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Tạo Kiểu',
    price: '',
    duration: '30',
    status: 'active',
    
    requirements: '',
    includes: '',
    bookingAdvanceDays: '30',
    cancellationPolicy: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        category: service.category || 'Tạo Kiểu',
        price: service.price?.toString() || '',
        duration: service.duration?.toString() || '30',
        status: service.isActive ? 'active' : 'inactive',
        
        requirements: service.requirements ? JSON.stringify(service.requirements) : '',
        includes: service.includes ? JSON.stringify(service.includes) : '',
        bookingAdvanceDays: service.bookingAdvanceDays?.toString() || '30',
        cancellationPolicy: service.cancellationPolicy || '',
        image: null
      });
      setImagePreview(service.imageUrl || null);
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Tạo Kiểu',
        price: '',
        duration: '30',
        status: 'active',
        
        requirements: '',
        includes: '',
        bookingAdvanceDays: '30',
        cancellationPolicy: '',
        image: null
      });
      setImagePreview(null);
    }
  }, [service]);

  const serviceCategories = categories.length > 0 ? categories : Object.keys(SERVICE_CATEGORIES);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const formatPrice = (value) => {
    if (!value) return '';
    const number = parseInt(value.replace(/\D/g, ''));
    return number ? number.toLocaleString('vi-VN') : '';
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const formatted = formatPrice(value);
    setFormData(prev => ({
      ...prev,
      price: formatted
    }));
  };

  const parseJSON = (jsonString) => {
    try {
      return jsonString ? JSON.parse(jsonString) : [];
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const serviceData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price.replace(/\D/g, '')) || 0,
        duration: parseInt(formData.duration) || 30,
        isActive: formData.status === 'active',
        
        requirements: parseJSON(formData.requirements),
        includes: parseJSON(formData.includes),
        bookingAdvanceDays: parseInt(formData.bookingAdvanceDays) || 30,
        cancellationPolicy: formData.cancellationPolicy,
        imageUrl: imagePreview
      };

      await onSave(serviceData);
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Có lỗi xảy ra khi xử lý dữ liệu. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
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
            {/* Hình ảnh dịch vụ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh dịch vụ
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">Upload</span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Chọn ảnh
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG tối đa 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tên dịch vụ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="Nhập tên dịch vụ"
                />
              </div>

              {/* Danh mục */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                >
                  {serviceCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả dịch vụ
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                placeholder="Mô tả chi tiết về dịch vụ"
              />
            </div>

            {/* Giá và Thời gian */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá dịch vụ (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handlePriceChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="0 ₫"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian (phút) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  min="5"
                  max="480"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đặt trước (ngày)
                </label>
                <input
                  type="number"
                  name="bookingAdvanceDays"
                  value={formData.bookingAdvanceDays}
                  onChange={handleInputChange}
                  min="0"
                  max="365"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="grid grid-cols-1 gap-6">
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
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm ngưng</option>
                </select>
              </div>

              

              
            </div>

            {/* Requirements và Includes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu đặc biệt (JSON format)
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent font-mono text-sm"
                  placeholder='["Tóc dài", "Không nhuộm trước"]'
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bao gồm (JSON format - cho combo)
                </label>
                <textarea
                  name="includes"
                  value={formData.includes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent font-mono text-sm"
                  placeholder='["Cắt tóc", "Gội đầu", "Massage"]'
                />
              </div>
            </div>

            {/* Chính sách hủy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chính sách hủy
              </label>
              <textarea
                name="cancellationPolicy"
                value={formData.cancellationPolicy}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                placeholder="Chính sách hủy dịch vụ..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Đang lưu...' : (service ? 'Cập nhật' : 'Thêm mới')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;