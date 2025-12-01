import BusinessHours from '../components/Home/BusinessHours';
import FeaturedServices from '../components/Home/FeaturedServices';
import HeroSection from '../components/Home/HeroSection';
import LocationSection from '../components/Home/LocationSection';
import PromotionsSection from '../components/Home/PromotionsSection';
import QuickBookingWidget from '../components/Home/QuickBookingWidget';
import StatsSection from '../components/Home/StatsSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';

function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedServices />
      <PromotionsSection />
      <QuickBookingWidget />
      <TestimonialsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-12 md:py-16">
        <BusinessHours />
        <LocationSection />
      </div>
    </div>
  );
}

export default HomePage
