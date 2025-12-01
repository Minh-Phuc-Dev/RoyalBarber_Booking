import React, { useState, useEffect } from "react";
import { X, Calendar, Percent, Save, Tag, Gift } from "lucide-react";

const PromotionModal = ({ isOpen, onClose, promotion = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    minAmount: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    status: "active",
  });

  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.name || "",
        description: promotion.desc || "",
        code: promotion.code || "",
        discountType: promotion.discountValue?.includes("%")
          ? "percentage"
          : "fixed",
        discountValue: promotion.discountValue?.replace(/[^0-9]/g, "") || "",
        minAmount: promotion.min?.replace(/[^0-9]/g, "") || "",
        maxDiscount: promotion.maxDiscount?.replace(/[^0-9]/g, "") || "",
        startDate: promotion.startDate || "",
        endDate: promotion.endDate || "",
        usageLimit: promotion.total?.toString() || "",
        status: promotion.status || "active",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        code: "",
        discountType: "percentage",
        discountValue: "",
        minAmount: "",
        maxDiscount: "",
        startDate: "",
        endDate: "",
        usageLimit: "",
        status: "active",
      });
    }
  }, [promotion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData((prev) => ({
      ...prev,
      code: random,
    }));
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    const number = parseInt(value.replace(/\D/g, ""));
    return number ? number.toLocaleString("vi-VN") : "";
  };

  const handleCurrencyChange = (e, field) => {
    const value = e.target.value;
    const formatted = formatCurrency(value);
    setFormData((prev) => ({
      ...prev,
      [field]: formatted,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const promotionData = {
      ...formData,
      discountValue:
        formData.discountType === "percentage"
          ? `${formData.discountValue}%`
          : `${formatCurrency(formData.discountValue)} ₫`,
      minAmount: formData.minAmount
        ? `Tối thiểu: ${formatCurrency(formData.minAmount)} ₫`
        : "",
      maxDiscount: formData.maxDiscount
        ? `Tối đa: ${formatCurrency(formData.maxDiscount)} ₫`
        : "",
      usageLimit: parseInt(formData.usageLimit) || 0,
    };

    onSave(promotionData);
    onClose();
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
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Gift className="w-6 h-6 mr-2 text-[#FF8800]" />
              {promotion ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi mới"}
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
            {/* Tên khuyến mãi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khuyến mãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                placeholder="Nhập tên chương trình khuyến mãi"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                placeholder="Mô tả về chương trình khuyến mãi"
              />
            </div>

            {/* Mã khuyến mãi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Mã khuyến mãi <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent uppercase"
                  placeholder="VD: SALE10"
                />
                <button
                  type="button"
                  onClick={generateCode}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Tạo ngẫu nhiên
                </button>
              </div>
            </div>

            {/* Loại giảm giá và Giá trị */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại giảm giá <span className="text-red-500">*</span>
                </label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                >
                  <option value="percentage">Phần trăm (%)</option>
                  <option value="fixed">Số tiền cố định (₫)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="w-4 h-4 inline mr-1" />
                  Giá trị giảm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={(e) => handleCurrencyChange(e, "discountValue")}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder={
                    formData.discountType === "percentage" ? "10" : "100,000"
                  }
                />
              </div>
            </div>

            {/* Giá trị tối thiểu và tối đa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá trị đơn hàng tối thiểu
                </label>
                <input
                  type="text"
                  name="minAmount"
                  value={formData.minAmount}
                  onChange={(e) => handleCurrencyChange(e, "minAmount")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="100,000"
                />
              </div>

              {formData.discountType === "percentage" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm giá tối đa
                  </label>
                  <input
                    type="text"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={(e) => handleCurrencyChange(e, "maxDiscount")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    placeholder="500,000"
                  />
                </div>
              )}
            </div>

            {/* Thời gian áp dụng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Ngày kết thúc <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                />
              </div>
            </div>

            {/* Giới hạn sử dụng và Trạng thái */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới hạn số lần sử dụng
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                  placeholder="100"
                />
              </div>

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
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Chưa kích hoạt</option>
                  <option value="expired">Đã hết hạn</option>
                </select>
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
                {promotion ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
