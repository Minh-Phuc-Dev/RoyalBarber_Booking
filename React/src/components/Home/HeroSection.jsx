import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Star, Award, Users, Scissors } from "lucide-react"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Royal Barber - Thợ cắt tóc chuyên nghiệp đang làm việc",
    },
    {
      src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Royal Barber - Không gian tiệm cắt tóc hiện đại",
    },
    {
      src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "Royal Barber - Dịch vụ cắt tóc cao cấp",
    },
  ]

  // Tự động chuyển slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6">
            <Award className="w-3 md:w-4 h-3 md:h-4 text-primary-400" />
            <span className="text-white text-xs md:text-sm font-medium">
              Salon #1 Quận 7
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-shadow">
            <span className="block">Royal Barber</span>
            <span className="block text-primary-400 text-2xl md:text-3xl lg:text-5xl mt-1 md:mt-2">
              Đẳng Cấp & Chuyên Nghiệp
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-2 md:px-0">
            Trải nghiệm dịch vụ cắt tóc và chăm sóc tóc đẳng cấp với đội ngũ thợ
            cắt tóc chuyên nghiệp và trang thiết bị hiện đại nhất
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4 md:px-0">
            <Link
              to="/booking"
              className="w-full md:w-auto btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 md:w-5 h-4 md:h-5" />
              <span>Đặt Lịch Ngay</span>
            </Link>
            <Link
              to="/services"
              className="w-full md:w-auto btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 glass-effect"
            >
              Xem Dịch Vụ
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <span className="block text-white font-bold text-xl">5000+</span>
              <p className="text-gray-200 text-sm">Khách Hàng Hài Lòng</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <span className="block text-white font-bold text-xl">5+</span>
              <p className="text-gray-200 text-sm">Năm Kinh Nghiệm</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Scissors className="w-6 h-6 text-orange-400" />
              </div>
              <span className="block text-white font-bold text-xl">8</span>
              <p className="text-gray-200 text-sm">Thợ Cắt Chuyên Nghiệp</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                <Star className="w-6 h-6 text-orange-400 fill-current" />
              </div>
              <span className="block text-white font-bold text-xl">4.9</span>
              <p className="text-gray-200 text-sm">Đánh Giá Trung Bình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentSlide ? "bg-primary-500 w-8" : "bg-white/50"
            }`}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-4 md:left-10 w-16 md:w-20 h-16 md:h-20 bg-primary-400/20 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 right-4 md:right-10 w-24 md:w-32 h-24 md:h-32 bg-primary-600/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  )
}

export default HeroSection
