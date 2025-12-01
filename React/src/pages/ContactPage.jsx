import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa Chỉ',
      content: '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
      action: 'Xem bản đồ'
    },
    {
      icon: Phone,
      title: 'Điện Thoại',
      content: '0347 206 121',
      action: 'Gọi ngay'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@royalbarber.vn',
      action: 'Gửi email'
    },
    {
      icon: Clock,
      title: 'Giờ Hoạt Động',
      content: 'Thứ 2 - Chủ Nhật: 8:00 - 20:00',
      action: 'Xem chi tiết'
    }
  ];

  const faqs = [
    {
      question: 'Làm thế nào để đặt lịch hẹn?',
      answer: 'Bạn có thể đặt lịch trực tuyến qua website, gọi điện thoại hoặc đến trực tiếp salon. Chúng tôi khuyến khích đặt lịch trước để đảm bảo có chỗ.'
    },
    {
      question: 'Có thể hủy hoặc thay đổi lịch hẹn không?',
      answer: 'Có, bạn có thể hủy hoặc thay đổi lịch hẹn trước 2 giờ. Vui lòng gọi điện hoặc nhắn tin để thông báo.'
    },
    {
      question: 'Salon có chỗ đỗ xe không?',
      answer: 'Có, chúng tôi có bãi đỗ xe rộng rãi cho cả xe máy và ô tô, hoàn toàn miễn phí cho khách hàng.'
    },
    {
      question: 'Có dịch vụ tư vấn miễn phí không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ tư vấn miễn phí về kiểu tóc, màu tóc phù hợp với khuôn mặt và phong cách của bạn.'
    },
    {
      question: 'Thời gian làm tóc mất bao lâu?',
      answer: 'Tùy vào dịch vụ: Cắt tóc 30-60 phút, nhuộm tóc 2-3 giờ, uốn/duỗi 2-4 giờ. Chúng tôi sẽ thông báo thời gian cụ thể khi đặt lịch.'
    },
    {
      question: 'Có chính sách bảo hành không?',
      answer: 'Có, chúng tôi bảo hành 30 ngày cho dịch vụ nhuộm tóc và 60 ngày cho uốn/duỗi tóc. Nếu không hài lòng, chúng tôi sẽ làm lại miễn phí.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ để được tư vấn miễn phí!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-secondary-600 mb-3">
                    {info.content}
                  </p>
                  <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                    {info.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-8 h-8 text-primary-600" />
                <h2 className="text-2xl font-bold text-secondary-800">
                  Gửi Tin Nhắn
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Họ Tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Chủ Đề
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="booking">Đặt lịch hẹn</option>
                    <option value="service">Tư vấn dịch vụ</option>
                    <option value="complaint">Khiếu nại</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Tin Nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Gửi Tin Nhắn</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                Vị Trí Salon
              </h2>
              <div className="relative rounded-lg overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Salon Location"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm text-secondary-800 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors">
                    Xem Bản Đồ Chi Tiết
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-secondary-800">Địa chỉ:</p>
                    <p className="text-secondary-600">123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-4">
                  <h4 className="font-semibold text-primary-800 mb-2">Cách di chuyển:</h4>
                  <ul className="text-sm text-primary-700 space-y-1">
                    <li>• Xe bus: Tuyến 18, 53, 88</li>
                    <li>• Grab/Taxi: Dễ dàng tìm thấy</li>
                    <li>• Xe máy/Ô tô: Có bãi đỗ miễn phí</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
              <HelpCircle className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-secondary-600">
              Tìm câu trả lời cho những thắc mắc phổ biến
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-secondary-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-secondary-600 mb-4">
              Không tìm thấy câu trả lời bạn cần?
            </p>
            <button className="btn-primary">
              Liên Hệ Trực Tiếp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;