import { useSettings } from '@src/hooks/UseSettings';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { settings, loading } = useSettings();

    return (
        <footer className="bg-secondary-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">RB</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{loading ? '...' : settings.title}</h3>
                                <p className="text-sm text-gray-300">Chuyên nghiệp & Đẳng cấp</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Royal Barber mang đến dịch vụ cắt tóc và chăm sóc tóc chuyên nghiệp với đội ngũ thợ cắt tóc giàu kinh nghiệm và trang thiết bị hiện đại.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Liên Kết Nhanh</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Trang Chủ</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Dịch Vụ</Link></li>
                            <li><Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Đặt Lịch</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Về Chúng Tôi</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Liên Hệ</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Dịch Vụ</h4>
                        <ul className="space-y-2">
                            <li><span className="text-gray-300">Cắt Tóc</span></li>
                            <li><span className="text-gray-300">Gội Đầu</span></li>
                            <li><span className="text-gray-300">Nhuộm Tóc</span></li>
                            <li><span className="text-gray-300">Uốn Tóc</span></li>
                            <li><span className="text-gray-300">Chăm Sóc Tóc</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Thông Tin Liên Hệ</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">
                                    {loading ? '...' : settings.address}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{loading ? '...' : settings.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{loading ? '...' : settings.email}</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <div className="text-gray-300 text-sm">
                                    <p>
                                        {
                                            loading ? null : <span>{settings.weekdays} (T2 - T6)</span>
                                        }

                                    </p>
                                    <p>

                                        {
                                            loading ? null : <span>{settings.weekend} (T7 - CN)</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Royal Barber. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;