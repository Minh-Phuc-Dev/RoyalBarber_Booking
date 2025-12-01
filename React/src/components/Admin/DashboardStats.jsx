import React from 'react';
import { BarChart3, Calendar, Users, Scissors, DollarSign, Clock, Star, AlertCircle } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Tổng Doanh Thu',
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue),
      change: `+${stats.monthlyGrowth}%`,
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Tổng Lịch Hẹn',
      value: stats.totalAppointments,
      change: `${stats.todayAppointments} hôm nay`,
      changeType: 'neutral',
      icon: Calendar,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Tổng Khách Hàng',
      value: stats.totalCustomers,
      change: 'Khách hàng mới',
      changeType: 'neutral',
      icon: Users,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Đánh Giá Trung Bình',
      value: stats.averageRating.toFixed(1),
      change: '/ 5.0',
      changeType: 'neutral',
      icon: Star,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              stat.changeType === 'positive' ? 'text-green-500' : 
              stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
            }`}>
              <span>{stat.change}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;