import BookingService from "@services/BookingService.js";
import BookingConfirmation from '@src/components/Booking/BookingConfirmation';
import BookingSteps from '@src/components/Booking/BookingSteps';
import CustomerInfo from '@src/components/Booking/CustomerInfo';
import DateTimeSelection from '@src/components/Booking/DateTimeSelection';
import ServiceSelection from '@src/components/Booking/ServiceSelection';
import { AuthenticateContext } from "@src/contexts/AuthenticateContext.jsx";
import { PAYMENT_METHODS } from "@src/enums";
import { generateCode } from "@src/utils";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, FileCheck, ShoppingBag, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";


const BookingPage = () => {
    const { user } = useContext(AuthenticateContext).store ?? {};


    const [currentStep, setCurrentStep] = useState(1);
    const [booking, setBooking] = useState(
        {
            service: null,
            staff: null,
            date: '',
            time: '',
            code: generateCode("BOOKING", 6),
            voucher: null,
            paymentMethod: PAYMENT_METHODS.CASH.value,
            customer: {
                name: '',
                phone: '',
                email: '',
                notes: ''
            }
        }
    );


    const steps = [
        {
            id: 1,
            title: 'Chọn Dịch Vụ',
            description: 'Chọn dịch vụ và stylist',
            icon: ShoppingBag
        },
        {
            id: 2,
            title: 'Chọn Thời Gian',
            description: 'Chọn ngày và giờ phù hợp',
            icon: Calendar
        },
        {
            id: 3,
            title: 'Thông Tin',
            description: 'Thanh toán và liên hệ',
            icon: User
        },
        {
            id: 4,
            title: 'Xác Nhận',
            description: 'Xác nhận hoàn tất',
            icon: FileCheck
        }
    ];

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleServiceSelect = (service) => {
        setBooking(
            {
                ...booking,
                service
            }
        );
    };

    const handleDateSelect = (date) => {
        setBooking({
            ...booking,
            date
        });
    };

    const handleTimeSelect = (time) => {
        setBooking({
            ...booking,
            time
        });
    };

    const handelVoucherSelect = (voucher) => {
        setBooking({
            ...booking,
            voucher
        });
    }

    const handleStaffSelect = (staff) => {
        setBooking({
            ...booking,
            staff
        });
    }

    const handleCustomerSubmit = (customer) => {
        setBooking({
            ...booking,
            customer
        });
        handleNext()
    };

    const handleBookingConfirm = async () => {
        const originalPrice = booking.service?.price || 0;
        const price = booking.voucher ? Math.max(0, originalPrice - (booking.voucher?.value || 0)) : originalPrice;

        const body = {
            serviceId: booking.service.id,
            staffId: booking.staff ? booking.staff.id : null,
            date: booking.date,
            time: booking.time,
            customerId: user ? user.id : null,
            price: Math.max(price, 0),
            paymentMethod: booking.customer.paymentMethod,
            code: booking.code,
            meta: {
                ...booking,
                originalPrice
            }
        }


        const { success, code, payload } = await BookingService.booking(body);


        if (code === 307) {
            window.location.href = payload.url;
            return
        }

        if (success) {
            toast.success('Đặt lịch thành công. Cảm ơn đã tin tưởng dịch vụ của chúng tôi!');
            return
        }

        toast.error('Đặt lịch thất bại. Vui lòng thử lại sau.');

    };

    const canProceedToNext = () => {
        switch (currentStep) {
            case 1:
                return booking.service && booking.staff;
            case 2:
                return booking.date && booking.time;
            case 3:
                return booking.customerInfo.name && booking.customerInfo.phone;
            default:
                return false;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ServiceSelection
                        booking={booking}
                        onServiceSelect={handleServiceSelect}
                        onStaffSelect={handleStaffSelect}
                    />
                );
            case 2:
                return (
                    <DateTimeSelection
                        booking={booking}
                        onTimeSelect={handleTimeSelect}
                        onDateSelect={handleDateSelect}
                        onStaffSelect={handleStaffSelect}
                    />
                );
            case 3:
                return (
                    <CustomerInfo
                        handlePrevious={handlePrevious}
                        booking={booking}
                        onSubmit={handleCustomerSubmit}
                    />
                );
            case 4:
                return (
                    <BookingConfirmation
                        booking={booking}
                        onConfirm={handleBookingConfirm}
                        onPrevious={handlePrevious}
                        onVoucherSelect={handelVoucherSelect}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <span className="text-primary-700 font-semibold">Đặt Lịch Cắt Tóc</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-4">
                        Đặt Lịch Cắt Tóc Tại Royal Barber
                    </h1>
                    <p className="text-lg md:text-xl text-secondary-600 max-w-3xl mx-auto">
                        Đặt lịch cắt tóc chuyên nghiệp tại Royal Barber. Chúng tôi cung cấp các dịch vụ cắt tóc hiện
                        đại, tạo kiểu râu và chăm sóc tóc dành riêng cho phái mạnh.
                    </p>
                </div>

                {/* Progress Steps */}
                <BookingSteps steps={steps} currentStep={currentStep} />

                {/* Step Content */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {renderStepContent()}
                </div>


                {(currentStep === 1 || currentStep === 2) && (
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className={twMerge(
                                "flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200",
                                currentStep === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-secondary-600 border border-gray-300 hover:bg-gray-50 hover:shadow-md"
                            )}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Quay Lại</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceedToNext()}
                            className={
                                twMerge(
                                    "flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200",
                                    canProceedToNext() ? "btn-primary shadow-lg hover:shadow-xl" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                )
                            }
                        >
                            <span>Tiếp Theo</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 4 Navigation - Show completion status */}
                {
                    (currentStep === 4 && booking.paymentMethod === PAYMENT_METHODS.CASH) ? (
                        <div className="flex justify-center items-center mt-8">
                            <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-6 py-3 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Sẵn Sàng Xác Nhận Đặt Lịch</span>
                            </div>
                        </div>
                    ) : (currentStep === 4 && booking.paymentMethod !== PAYMENT_METHODS.BANKING) ? (
                        <div className="flex justify-center items-center mt-8">
                            <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-6 py-3 rounded-lg">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Chuyển Đến Cổng Thanh Toán Để Hoàn Tất Đặt Lịch</span>
                            </div>
                        </div>
                    ) : null

                }
            </div>
        </div>
    );
};

export default BookingPage;
