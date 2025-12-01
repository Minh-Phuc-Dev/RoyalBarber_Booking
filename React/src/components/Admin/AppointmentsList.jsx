import React from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, MoreVertical } from 'lucide-react';

const AppointmentsList = ({ appointments }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Lịch Hẹn Gần Đây</h3>
          <p className="text-gray-600 text-sm">Quản lý và theo dõi các lịch hẹn</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          Xem tất cả
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
              <th className="pb-3">Khách Hàng</th>
              <th className="pb-3">Dịch Vụ</th>
              <th className="pb-3">Thời Gian</th>
              <th className="pb-3">Thợ Cắt</th>
              <th className="pb-3">Trạng Thái</th>
              <th className="pb-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">
                  <div>
                    <div className="font-medium text-gray-900">{appointment.customerName}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {appointment.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="font-medium text-gray-900">{appointment.service}</div>
                </td>
                <td className="py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {appointment.time}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm text-gray-900">{appointment.barber}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(appointment.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không có lịch hẹn nào</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;