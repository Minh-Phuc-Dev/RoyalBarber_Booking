import React from 'react';
import { Users, Scissors, Award, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: '2000+',
      label: 'Khách hàng hài lòng',
      description: 'Tin tưởng và quay lại'
    },
    {
      icon: Scissors,
      number: '5000+',
      label: 'Lượt cắt tóc',
      description: 'Hoàn thành mỗi tháng'
    },
    {
      icon: Award,
      number: '5+',
      label: 'Năm kinh nghiệm',
      description: 'Trong ngành làm đẹp'
    },
    {
      icon: Clock,
      number: '100%',
      label: 'Đúng giờ hẹn',
      description: 'Cam kết chất lượng'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-primary-100 rounded-full mb-3 md:mb-4 group-hover:bg-primary-200 transition-colors">
                  <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-primary-600" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-800 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-lg font-semibold text-secondary-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-secondary-500">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;