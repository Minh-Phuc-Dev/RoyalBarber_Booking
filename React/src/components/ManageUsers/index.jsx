import {
    Ban,
    Calendar,
    CheckCircle,
    Download,
    Edit,
    Eye,
    Mail,
    Phone,
    Search,
    Shield,
    Trash2,
    User,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminUsersPage = () => {
    // Mock data for users
    const mockUsers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0912345678',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-15',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 5,
            totalSpent: 2500000
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranhib@example.com',
            phone: '0923456789',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-02-01',
            lastLogin: '2024-01-19',
            status: 'active',
            totalAppointments: 3,
            totalSpent: 1500000
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@example.com',
            phone: '0934567890',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-10',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 0,
            totalSpent: 0
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@example.com',
            phone: '0945678901',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-05',
            lastLogin: '2024-01-10',
            status: 'inactive',
            totalAppointments: 2,
            totalSpent: 1000000
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@example.com',
            phone: '0956789012',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-20',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 1,
            totalSpent: 500000
        }
    ];

    const [users, setUsers] = useState(mockUsers);
    const [filteredUsers, setFilteredUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Filter users based on search and filters
    useEffect(() => {
        let filtered = users;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm)
            );
        }

        // Role filter
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        setFilteredUsers(filtered);
    }, [users, searchTerm, roleFilter, statusFilter]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRoleFilter = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status
        });
        setShowEditModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserDetails(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const toggleUserStatus = (user) => {
        setUsers(users.map(u =>
            u.id === user.id
                ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
                : u
        ));
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = () => {
        if (selectedUser) {
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? {
                        ...user,
                        name: editFormData.name,
                        email: editFormData.email,
                        phone: editFormData.phone,
                        role: editFormData.role,
                        status: editFormData.status
                    }
                    : user
            ));
            setShowEditModal(false);
            setSelectedUser(null);
        }
    };

    const exportUsers = () => {
        const csvContent = [
            ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date', 'Last Login', 'Total Appointments', 'Total Spent'],
            ...filteredUsers.map(user => [
                user.id,
                user.name,
                user.email,
                user.phone,
                user.role,
                user.status,
                user.joinDate,
                user.lastLogin,
                user.totalAppointments,
                user.totalSpent
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        customerUsers: users.filter(u => u.role === 'customer').length
    };

    return (
        <div className="w-full min-h-screen bg-[#FAFBFC] font-['Inter',_sans-serif]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản Lý Tài Khoản Người Dùng</h1>
                <p className="text-gray-500">Quản lý tất cả tài khoản người dùng trong hệ thống</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng Người Dùng</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đang Hoạt Động</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Admin</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.adminUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Khách Hàng</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.customerUsers}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3">
                        <select
                            value={roleFilter}
                            onChange={handleRoleFilter}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Khách hàng</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={handleStatusFilter}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>

                        <button
                            onClick={exportUsers}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thống kê</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center gap-1">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {user.email}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {user.phone}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Tham gia: {user.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role === 'admin' ? (
                                                <>
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Admin
                                                </>
                                            ) : (
                                                <>
                                                    <User className="w-3 h-3 mr-1" />
                                                    Khách hàng
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status === 'active' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Hoạt động
                                                </>
                                            ) : (
                                                <>
                                                    <Ban className="w-3 h-3 mr-1" />
                                                    Không hoạt động
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div>{user.totalAppointments} lịch hẹn</div>
                                        <div className="text-gray-500">{user.totalSpent.toLocaleString('vi-VN')}đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleUserStatus(user)}
                                                className={`${user.status === 'active'
                                                    ? 'text-orange-600 hover:text-orange-900'
                                                    : 'text-green-600 hover:text-green-900'
                                                    } transition-colors`}
                                                title={user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                            >
                                                {user.status === 'active' ? (
                                                    <Ban className="w-4 h-4" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy người dùng</h3>
                        <p className="mt-1 text-sm text-gray-500">Không có người dùng nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xác nhận xóa người dùng</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa người dùng "{selectedUser.name}"? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Modal */}
            {showUserDetails && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Chi tiết người dùng</h3>
                            <button
                                onClick={() => setShowUserDetails(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex items-center mb-6">
                            <img
                                className="h-20 w-20 rounded-full object-cover"
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                            />
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">{selectedUser.name}</h4>
                                <p className="text-gray-600">{selectedUser.email}</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedUser.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {selectedUser.role === 'admin' ? 'Admin' : 'Khách hàng'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID:</span>
                                        <span className="text-gray-900">{selectedUser.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-900">{selectedUser.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số điện thoại:</span>
                                        <span className="text-gray-900">{selectedUser.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Trạng thái:</span>
                                        <span className={`${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-medium text-gray-900 mb-3">Thông tin hoạt động</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ngày tham gia:</span>
                                        <span className="text-gray-900">{selectedUser.joinDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Đăng nhập cuối:</span>
                                        <span className="text-gray-900">{selectedUser.lastLogin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng lịch hẹn:</span>
                                        <span className="text-gray-900">{selectedUser.totalAppointments}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng chi tiêu:</span>
                                        <span className="text-gray-900">{selectedUser.totalSpent.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowUserDetails(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    setShowUserDetails(false);
                                    handleEditUser(selectedUser);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Chỉnh Sửa Người Dùng</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editFormData.phone || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                                <select
                                    name="role"
                                    value={editFormData.role || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="customer">Khách hàng</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    name="status"
                                    value={editFormData.status || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;
const AdminUsersPage = () => {
    // Mock data for users
    const mockUsers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0912345678',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-15',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 5,
            totalSpent: 2500000
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranhib@example.com',
            phone: '0923456789',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-02-01',
            lastLogin: '2024-01-19',
            status: 'active',
            totalAppointments: 3,
            totalSpent: 1500000
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@example.com',
            phone: '0934567890',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-10',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 0,
            totalSpent: 0
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@example.com',
            phone: '0945678901',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-05',
            lastLogin: '2024-01-10',
            status: 'inactive',
            totalAppointments: 2,
            totalSpent: 1000000
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@example.com',
            phone: '0956789012',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            joinDate: '2024-01-20',
            lastLogin: '2024-01-20',
            status: 'active',
            totalAppointments: 1,
            totalSpent: 500000
        }
    ];

    const [users, setUsers] = useState(mockUsers);
    const [filteredUsers, setFilteredUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Filter users based on search and filters
    useEffect(() => {
        let filtered = users;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm)
            );
        }

        // Role filter
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        setFilteredUsers(filtered);
    }, [users, searchTerm, roleFilter, statusFilter]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRoleFilter = (e) => {
        setRoleFilter(e.target.value);
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status
        });
        setShowEditModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserDetails(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const toggleUserStatus = (user) => {
        setUsers(users.map(u =>
            u.id === user.id
                ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
                : u
        ));
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = () => {
        if (selectedUser) {
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? {
                        ...user,
                        name: editFormData.name,
                        email: editFormData.email,
                        phone: editFormData.phone,
                        role: editFormData.role,
                        status: editFormData.status
                    }
                    : user
            ));
            setShowEditModal(false);
            setSelectedUser(null);
        }
    };

    const exportUsers = () => {
        const csvContent = [
            ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date', 'Last Login', 'Total Appointments', 'Total Spent'],
            ...filteredUsers.map(user => [
                user.id,
                user.name,
                user.email,
                user.phone,
                user.role,
                user.status,
                user.joinDate,
                user.lastLogin,
                user.totalAppointments,
                user.totalSpent
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'active').length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        customerUsers: users.filter(u => u.role === 'customer').length
    };

    return (
        <div className="w-full min-h-screen bg-[#FAFBFC] font-['Inter',_sans-serif]">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Quản Lý Tài Khoản Người Dùng</h1>
                <p className="text-gray-500">Quản lý tất cả tài khoản người dùng trong hệ thống</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng Người Dùng</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đang Hoạt Động</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Admin</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.adminUsers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Khách Hàng</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.customerUsers}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3">
                        <select
                            value={roleFilter}
                            onChange={handleRoleFilter}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="customer">Khách hàng</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={handleStatusFilter}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>

                        <button
                            onClick={exportUsers}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Xuất CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông tin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thống kê</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 flex items-center gap-1">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {user.email}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {user.phone}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Tham gia: {user.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role === 'admin' ? (
                                                <>
                                                    <Shield className="w-3 h-3 mr-1" />
                                                    Admin
                                                </>
                                            ) : (
                                                <>
                                                    <User className="w-3 h-3 mr-1" />
                                                    Khách hàng
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status === 'active' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Hoạt động
                                                </>
                                            ) : (
                                                <>
                                                    <Ban className="w-3 h-3 mr-1" />
                                                    Không hoạt động
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div>{user.totalAppointments} lịch hẹn</div>
                                        <div className="text-gray-500">{user.totalSpent.toLocaleString('vi-VN')}đ</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleUserStatus(user)}
                                                className={`${user.status === 'active'
                                                    ? 'text-orange-600 hover:text-orange-900'
                                                    : 'text-green-600 hover:text-green-900'
                                                    } transition-colors`}
                                                title={user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                            >
                                                {user.status === 'active' ? (
                                                    <Ban className="w-4 h-4" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy người dùng</h3>
                        <p className="mt-1 text-sm text-gray-500">Không có người dùng nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Xác nhận xóa người dùng</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn xóa người dùng "{selectedUser.name}"? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Details Modal */}
            {showUserDetails && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Chi tiết người dùng</h3>
                            <button
                                onClick={() => setShowUserDetails(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex items-center mb-6">
                            <img
                                className="h-20 w-20 rounded-full object-cover"
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                            />
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">{selectedUser.name}</h4>
                                <p className="text-gray-600">{selectedUser.email}</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedUser.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {selectedUser.role === 'admin' ? 'Admin' : 'Khách hàng'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-medium text-gray-900 mb-3">Thông tin cá nhân</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ID:</span>
                                        <span className="text-gray-900">{selectedUser.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-900">{selectedUser.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số điện thoại:</span>
                                        <span className="text-gray-900">{selectedUser.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Trạng thái:</span>
                                        <span className={`${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-medium text-gray-900 mb-3">Thông tin hoạt động</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Ngày tham gia:</span>
                                        <span className="text-gray-900">{selectedUser.joinDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Đăng nhập cuối:</span>
                                        <span className="text-gray-900">{selectedUser.lastLogin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng lịch hẹn:</span>
                                        <span className="text-gray-900">{selectedUser.totalAppointments}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng chi tiêu:</span>
                                        <span className="text-gray-900">{selectedUser.totalSpent.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowUserDetails(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    setShowUserDetails(false);
                                    handleEditUser(selectedUser);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Chỉnh Sửa Người Dùng</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editFormData.phone || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                                <select
                                    name="role"
                                    value={editFormData.role || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="customer">Khách hàng</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                                <select
                                    name="status"
                                    value={editFormData.status || ''}
                                    onChange={handleEditFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 justify-end">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersPage;