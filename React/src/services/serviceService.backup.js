import { api } from '@services/Api.js';

// Chuẩn hóa danh mục dịch vụ đồng bộ với backend
export const SERVICE_CATEGORIES = {
  "Tạo Kiểu": "Tạo kiểu tóc chuyên nghiệp từ cơ bản đến phức tạp",
  "Chăm Sóc": "Dịch vụ chăm sóc tóc và da đầu chuyên sâu",
  "Nhuộm Tóc": "Dịch vụ nhuộm màu, highlight, và xử lý tóc",
  "Combo Nổi Bật": "Gói dịch vụ kết hợp nhiều ưu đãi đặc biệt"
};

export const serviceServiceBackup = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await api.get('services');
      return response.data.services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`services/${id}`);
      return response.data.service;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  },

  // Get services by category
  getServicesByCategory: async (category) => {
    try {
      const response = await api.get(`services/category/${category}`);
      return response.data.services;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw error;
    }
  },

  // Get popular services
  getPopularServices: async () => {
    try {
      const response = await api.get('services/popular');
      return response.data.services;
    } catch (error) {
      console.error('Error fetching popular services:', error);
      throw error;
    }
  },

  // Get combo services
  getComboServices: async () => {
    try {
      const response = await api.get('services/combos');
      return response.data.services;
    } catch (error) {
      console.error('Error fetching combo services:', error);
      throw error;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await api.post('admin/services', serviceData);
      return response.data.service;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`admin/services/${id}`, serviceData);
      return response.data.service;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await api.delete(`admin/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  // Toggle service active status
  toggleServiceStatus: async (id) => {
    try {
      const response = await api.patch(`admin/services/${id}/toggle-status`);
      return response.data.service;
    } catch (error) {
      console.error('Error toggling service status:', error);
      throw error;
    }
  },

  // Toggle service popular status
  togglePopularStatus: async (id) => {
    try {
      const response = await api.patch(`admin/services/${id}/toggle-popular`);
      return response.data.service;
    } catch (error) {
      console.error('Error toggling popular status:', error);
      throw error;
    }
  },

  // Get service categories
  getCategories: () => {
    return Object.keys(SERVICE_CATEGORIES);
  },

  // Get category description
  getCategoryDescription: (category) => {
    return SERVICE_CATEGORIES[category] || '';
  },

  // Format price for display
  formatPrice: (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  },

  // Format duration for display
  formatDuration: (duration) => {
    if (duration < 60) {
      return `${duration} phút`;
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
  }
};