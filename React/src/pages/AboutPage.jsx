import React from 'react';
import { Award, Users, Clock, Heart, Star, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, number: '2000+', label: 'Khách hàng hài lòng' },
    { icon: Award, number: '5+', label: 'Năm kinh nghiệm' },
    { icon: Clock, number: '99%', label: 'Đúng giờ hẹn' },
    { icon: Heart, number: '4.9', label: 'Đánh giá trung bình' }
  ];

  const team = [
    {
      name: 'Nguyễn Văn Minh',
      role: 'Master Stylist & Founder',
      experience: '8 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      specialties: ['Cắt tóc', 'Tạo kiểu', 'Tư vấn phong cách']
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Senior Stylist',
      experience: '6 năm kinh nghiệm',
      image: './images/tho2.jpg',
      specialties: ['Uốn tóc', 'Nhuộm tóc', 'Chăm sóc tóc']
    },
    {
      name: 'Lê Văn Đức',
      role: 'Color Specialist',
      experience: '5 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      specialties: ['Undercut', 'Sấy tạo kiểu', 'Chăm sóc râu']
    },
    {
      name: 'Phạm Văn Lâm',
      role: 'Hair Treatment Expert',
      experience: '4 năm kinh nghiệm',
      image: './images/tho1.jpg',
      specialties: ['Tạo kiểu', 'Vuốt sáp', 'Gội massage đầu']
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Chất Lượng Hàng Đầu',
      description: 'Cam kết mang đến dịch vụ chất lượng cao nhất với đội ngũ stylist chuyên nghiệp và trang thiết bị hiện đại.'
    },
    {
      icon: Heart,
      title: 'Tận Tâm Phục Vụ',
      description: 'Luôn lắng nghe và thấu hiểu nhu cầu của khách hàng để mang đến trải nghiệm tốt nhất.'
    },
    {
      icon: Users,
      title: 'Đội Ngũ Chuyên Nghiệp',
      description: 'Stylist giàu kinh nghiệm, được đào tạo bài bản và cập nhật xu hướng thời trang mới nhất.'
    },
    {
      icon: CheckCircle,
      title: 'Cam Kết Chất Lượng',
      description: 'Bảo hành dịch vụ và cam kết hài lòng 100% hoặc hoàn tiền cho khách hàng.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Về Royal Barber
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
              Hành trình 5 năm xây dựng thương hiệu salon hàng đầu với sứ mệnh mang đến vẻ đẹp và sự tự tin cho mọi khách hàng
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-secondary-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-secondary-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-6">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  Royal Barber được thành lập vào năm 2019 với mong muốn mang đến cho khách hàng những trải nghiệm làm đẹp đẳng cấp và chuyên nghiệp nhất. Bắt đầu từ một salon nhỏ với 2 stylist, chúng tôi đã không ngừng phát triển và hoàn thiện.
                </p>
                <p>
                  Với triết lý "Vẻ đẹp là sự tự tin", chúng tôi luôn nỗ lực để hiểu rõ nhu cầu và mong muốn của từng khách hàng. Mỗi kiểu tóc không chỉ là một tác phẩm nghệ thuật mà còn là cách để khách hàng thể hiện cá tính và phong cách riêng.
                </p>
                <p>
                  Ngày nay, Royal Barber đã trở thành địa chỉ tin cậy của hơn 2000 khách hàng với đội ngũ 8 stylist chuyên nghiệp và không gian salon hiện đại, sang trọng.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Royal Barber Interior"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              Đội Ngũ Chuyên Gia
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Gặp gỡ những stylist tài năng và giàu kinh nghiệm của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-secondary-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-secondary-500 mb-4">
                  {member.experience}
                </p>
                <div className="space-y-1">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium mr-1 mb-1"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-secondary-800 to-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sứ Mệnh Của Chúng Tôi
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            "Mang đến cho mỗi khách hàng không chỉ là một mái tóc đẹp, mà là sự tự tin, phong cách và cảm giác hạnh phúc khi nhìn thấy chính mình trong gương."
          </p>
          <div className="flex items-center justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-lg font-semibold">4.9/5 từ 2000+ khách hàng</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;