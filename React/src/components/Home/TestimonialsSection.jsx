import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      role: 'Khách hàng thân thiết',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      comment: 'Royal Barber thực sự là nơi tuyệt vời! Tôi đã cắt tóc ở đây được 2 năm và luôn hài lòng với dịch vụ. Các thợ cắt tóc rất chuyên nghiệp và tận tâm.',
      service: 'Cắt tóc'
    },
    {
      id: 2,
      name: 'Trần Văn Hùng',
      role: 'Doanh nhân',
      avatar: './images/tho2.jpg',
      rating: 5,
      comment: 'Dịch vụ tuyệt vời, không gian sang trọng và sạch sẽ. Đặc biệt là hệ thống đặt lịch online rất tiện lợi, giúp tôi tiết kiệm thời gian.',
      service: 'Cắt tóc'
    },
    {
      id: 3,
      name: 'Lê Văn Đức',
      role: 'Giáo viên',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5,
      comment: 'Tôi rất thích không khí ở đây, nhân viên thân thiện và chuyên nghiệp. Mái tóc của tôi được chăm sóc rất kỹ lưỡng và luôn đẹp sau mỗi lần đến.',
      service: 'Nhuộm tóc'
    },
    {
      id: 4,
      name: 'Phạm Đức Minh',
      role: 'Sinh viên',
      avatar: './images/tho1.jpg',
      rating: 5,
      comment: 'Giá cả hợp lý, chất lượng dịch vụ tốt. Đặc biệt có nhiều khuyến mãi cho sinh viên. Tôi sẽ giới thiệu cho bạn bè cùng đến.',
      service: 'Cắt tóc'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 md:w-4 h-3 md:h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-3 md:mb-4">
            Khách Hàng Nói Gì
          </h2>
          <p className="text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto px-2 md:px-0">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
          </p>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-4 md:mt-6 rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card p-4 md:p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Quote className="w-5 md:w-6 h-5 md:h-6 text-primary-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-3 md:mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Comment */}
              <p className="text-secondary-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed text-center">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="text-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 md:w-12 h-10 md:h-12 rounded-full mx-auto mb-2 md:mb-3 object-cover"
                />
                <h4 className="font-semibold text-secondary-800 text-sm md:text-base">{testimonial.name}</h4>
                <p className="text-xs md:text-sm text-secondary-500">{testimonial.role}</p>
                <div className="mt-1 md:mt-2 inline-block bg-primary-100 text-primary-700 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 md:space-x-4 bg-white rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {renderStars(5)}
              </div>
              <span className="text-xl md:text-2xl font-bold text-secondary-800">4.9</span>
            </div>
            <div className="w-px h-6 md:h-8 bg-gray-300"></div>
            <div className="text-left">
              <p className="text-xs md:text-sm text-secondary-600">Dựa trên</p>
              <p className="font-semibold text-secondary-800 text-sm md:text-base">2,000+ đánh giá</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;