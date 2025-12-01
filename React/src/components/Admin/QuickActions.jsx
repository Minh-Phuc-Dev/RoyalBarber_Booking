import { Bell, Calendar, MessageSquare, Plus, Scissors, Settings, Users } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            title: 'Tạo Lịch Hẹn Mới',
            description: 'Thêm lịch hẹn cho khách hàng',
            icon: Plus,
            color: 'bg-blue-500',
            action: () => console.log('Create new appointment')
        },
        {
            title: 'Quản Lý Lịch',
            description: 'Xem và quản lý tất cả lịch hẹn',
            icon: Calendar,
            color: 'bg-green-500',
            action: () => console.log('Manage appointments')
        },
        {
            title: 'Khách Hàng',
            description: 'Quản lý thông tin khách hàng',
            icon: Users,
            color: 'bg-purple-500',
            action: () => console.log('Manage customers')
        },
        {
            title: 'Dịch Vụ',
            description: 'Cập nhật dịch vụ và giá cả',
            icon: Scissors,
            color: 'bg-orange-500',
            action: () => console.log('Manage services')
        },
        // {
        //   title: 'Báo Cáo',
        //   description: 'Xem báo cáo doanh thu',
        //   icon: BarChart3,
        //   color: 'bg-red-500',
        //   action: () => console.log('View reports')
        // },
        {
            title: 'Cài Đặt',
            description: 'Cấu hình hệ thống',
            icon: Settings,
            color: 'bg-gray-500',
            action: () => console.log('Settings')
        }
    ];

    const notifications = [
        {
            id: 1,
            title: 'Lịch hẹn mới',
            message: 'Nguyễn Văn A đặt lịch cắt tóc lúc 14:00',
            time: '5 phút trước',
            type: 'appointment',
            read: false
        },
        {
            id: 2,
            title: 'Khách hàng mới',
            message: 'Trần Thị B đã đăng ký tài khoản',
            time: '15 phút trước',
            type: 'customer',
            read: false
        },
        {
            id: 3,
            title: 'Hệ thống',
            message: 'Backup dữ liệu thành công',
            time: '1 giờ trước',
            type: 'system',
            read: true
        }
    ];

    return (
        <div className="space-y-6">
            {/* Quick Actions Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Thao Tác Nhanh</h3>
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="group p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left"
                        >
                            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                            <p className="text-xs text-gray-600">{action.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Thông Báo Gần Đây</h3>
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                </div>

                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors ${notification.read
                                ? 'bg-gray-50 border-gray-200'
                                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                                }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'appointment' ? 'bg-blue-100' :
                                    notification.type === 'customer' ? 'bg-green-100' :
                                        'bg-gray-100'
                                    }`}>
                                    {notification.type === 'appointment' && <Calendar className="w-4 h-4 text-blue-600" />}
                                    {notification.type === 'customer' && <Users className="w-4 h-4 text-green-600" />}
                                    {notification.type === 'system' && <MessageSquare className="w-4 h-4 text-gray-600" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'
                                            }`}>
                                            {notification.title}
                                            {!notification.read && (
                                                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                                            )}
                                        </h4>
                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                    </div>
                                    <p className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-600'
                                        } mt-1`}>
                                        {notification.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Xem tất cả thông báo
                </button>
            </div>
        </div>
    );
};

export default QuickActions;