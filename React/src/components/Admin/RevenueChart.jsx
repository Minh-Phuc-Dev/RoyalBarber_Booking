import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

const RevenueChart = ({ period }) => {
  // Mock data for different periods
  const chartData = {
    today: {
      labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
      data: [2000000, 3500000, 4200000, 3800000, 5100000, 2900000],
      total: 21500000
    },
    week: {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      data: [12000000, 15000000, 18000000, 16000000, 22000000, 25000000, 19000000],
      total: 127000000
    },
    month: {
      labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
      data: [85000000, 92000000, 88000000, 95000000],
      total: 360000000
    },
    year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      data: [280000000, 320000000, 350000000, 380000000],
      total: 1330000000
    }
  };

  const currentData = chartData[period] || chartData.month;
  const maxValue = Math.max(...currentData.data);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Doanh Thu</h3>
          <p className="text-gray-600 text-sm">
            {period === 'today' && 'Hôm nay'}
            {period === 'week' && 'Tuần này'}
            {period === 'month' && 'Tháng này'}
            {period === 'year' && 'Năm này'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">+12.5%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-48 space-x-2">
          {currentData.data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2">
                {currentData.labels[index]}
              </div>
              <div className="relative w-full flex-1 flex items-end">
                <div 
                  className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500"
                  style={{ 
                    height: `${(value / maxValue) * 100}%`,
                    minHeight: '8px'
                  }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 font-medium">
                {value >= 1000000 ? `${(value / 1000000).toFixed(0)}M` : formatCurrency(value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Tổng doanh thu:</span>
        </div>
        <span className="text-lg font-bold text-primary-600">
          {formatCurrency(currentData.total)}
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;