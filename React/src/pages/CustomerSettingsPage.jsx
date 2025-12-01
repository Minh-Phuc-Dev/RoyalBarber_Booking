import { useAuthenticate } from "@src/contexts/AuthenticateContext";
import {
  Bell,
  Calendar,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Smartphone,
  Trash2,
  User
} from "lucide-react";
import { useState } from "react";


const CustomerSettingsPage = () => {
  const user = useAuthenticate().store?.user
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Form states
  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    promotions: true,
    updates: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showPhone: false,
    showEmail: false,
    dataSharing: false
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveAccount = () => {
    console.log("Saving account settings:", accountForm);
    // TODO: Implement actual save logic
    alert("Cài đặt tài khoản đã được lưu!");
  };

  const handleSaveNotifications = () => {
    console.log("Saving notification settings:", notificationSettings);
    // TODO: Implement actual save logic
    alert("Cài đặt thông báo đã được lưu!");
  };

  const handleSavePrivacy = () => {
    console.log("Saving privacy settings:", privacySettings);
    // TODO: Implement actual save logic
    alert("Cài đặt quyền riêng tư đã được lưu!");
  };

  const handleExportData = () => {
    console.log("Exporting user data");
    // TODO: Implement actual export logic
    alert("Dữ liệu của bạn đang được chuẩn bị để tải xuống!");
  };

  const handleDeleteAccount = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
      console.log("Deleting account");
      // TODO: Implement actual delete logic
      alert("Yêu cầu xóa tài khoản đã được gửi!");
    }
  };

  const tabs = [
    { id: "account", name: "Tài khoản", icon: <User className="w-5 h-5" /> },
    { id: "notifications", name: "Thông báo", icon: <Bell className="w-5 h-5" /> },
    { id: "privacy", name: "Quyền riêng tư", icon: <Shield className="w-5 h-5" /> },
    { id: "security", name: "Bảo mật", icon: <Lock className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài Đặt</h1>
          <p className="text-gray-600">Quản lý cài đặt tài khoản và quyền riêng tư của bạn</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${activeTab === tab.id
                    ? "bg-[#FF8800] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin tài khoản</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={accountForm.name}
                      onChange={handleAccountChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={accountForm.email}
                      onChange={handleAccountChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={accountForm.phone}
                      onChange={handleAccountChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={accountForm.address}
                      onChange={handleAccountChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Đổi mật khẩu</h3>
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={accountForm.currentPassword}
                        onChange={handleAccountChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu mới
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={accountForm.newPassword}
                        onChange={handleAccountChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={accountForm.confirmPassword}
                        onChange={handleAccountChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveAccount}
                    className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt thông báo</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Thông báo email</h3>
                        <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleNotificationChange("emailNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                        <p className="text-sm text-gray-500">Nhận tin nhắn SMS nhắc lịch hẹn</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={() => handleNotificationChange("smsNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Thông báo đẩy</h3>
                        <p className="text-sm text-gray-500">Nhận thông báo trên trình duyệt</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={() => handleNotificationChange("pushNotifications")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Nhắc lịch hẹn</h3>
                        <p className="text-sm text-gray-500">Nhận nhắc nhở trước lịch hẹn</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.appointmentReminders}
                        onChange={() => handleNotificationChange("appointmentReminders")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Khuyến mãi</h3>
                        <p className="text-sm text-gray-500">Nhận thông tin về chương trình khuyến mãi</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.promotions}
                        onChange={() => handleNotificationChange("promotions")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quyền riêng tư</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Hiển thị hồ sơ công khai</h3>
                      <p className="text-sm text-gray-500">Cho phép người khác xem hồ sơ của bạn</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.profileVisible}
                        onChange={() => handlePrivacyChange("profileVisible")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Hiển thị số điện thoại</h3>
                      <p className="text-sm text-gray-500">Cho phép hiển thị số điện thoại công khai</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showPhone}
                        onChange={() => handlePrivacyChange("showPhone")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Hiển thị email</h3>
                      <p className="text-sm text-gray-500">Cho phép hiển thị email công khai</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showEmail}
                        onChange={() => handlePrivacyChange("showEmail")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Chia sẻ dữ liệu</h3>
                      <p className="text-sm text-gray-500">Cho phép chia sẻ dữ liệu với đối tác</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.dataSharing}
                        onChange={() => handlePrivacyChange("dataSharing")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF8800]"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quản lý dữ liệu</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Xuất dữ liệu
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 px-4 py-3 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      Xóa tài khoản
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSavePrivacy}
                    className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bảo mật</h2>

                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Xác thực hai yếu tố</h3>
                    <p className="text-sm text-gray-500 mb-4">Thêm lớp bảo mật bổ sung cho tài khoản của bạn</p>
                    <button className="px-4 py-2 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                      Kích hoạt 2FA
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Thiết bị đã đăng nhập</h3>
                    <p className="text-sm text-gray-500 mb-4">Quản lý các thiết bị đang đăng nhập vào tài khoản của bạn</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">iPhone 13 Pro</p>
                            <p className="text-sm text-gray-500">Hà Nội • Đang hoạt động</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Đăng xuất
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">Chrome trên Windows</p>
                            <p className="text-sm text-gray-500">Hồ Chí Minh • 2 ngày trước</p>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Lịch sử hoạt động</h3>
                    <p className="text-sm text-gray-500 mb-4">Xem lịch sử đăng nhập và hoạt động gần đây</p>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Xem lịch sử
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettingsPage;