import { PAYMENT_METHODS } from '@src/enums';
import { usePromotions } from '@src/hooks/UsePromotions';
import { formatDate, formatPrice } from '@src/utils';
import { isEmpty } from 'lodash';
import { Calendar, CheckCircle, Clock, Mail, MapPin, Phone, Star, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const BookingConfirmation = ({ booking, onConfirm, onPrevious, onVoucherSelect }) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const { promotions, loading } = usePromotions()

    const handleConfirmBooking = async () => {
        setIsSubmitting(true);

        if (onConfirm) {
            await onConfirm();
        }
        setIsSubmitting(false);
        setIsConfirmed(true);
    };

    if (isConfirmed) {
        return (
            <div className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                        Đặt Lịch Thành Công!
                    </h3>
                    <p className="text-secondary-600">
                        Cảm ơn bạn đã tin tưởng Royal Barber. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
                    </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-3">Mã Đặt Lịch</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                        {booking.code}
                    </div>
                    <p className="text-sm text-green-700">
                        Vui lòng lưu mã này để tra cứu lịch hẹn
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => window.print()}
                        className="w-full btn-secondary"
                    >
                        In Phiếu Đặt Lịch
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full btn-primary"
                    >
                        Về Trang Chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            <div>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-3xl font-bold text-secondary-800 mb-3">Xác Nhận Đặt Lịch</h3>
                    <p className="text-gray-600 text-lg">
                        Vui lòng kiểm tra lại thông tin trước khi xác nhận
                    </p>
                </div>

                {/* Booking Summary */}
                <div className="card p-6 mb-6">
                    <h4 className="text-xl font-semibold text-secondary-800 mb-4">Thông Tin Đặt Lịch</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Service Info */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Dịch Vụ</p>
                                    <p className="text-secondary-600">{booking.service?.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Thời gian: {booking.service?.duration} phút
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Star className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Stylist</p>
                                    <p className="text-secondary-600">{booking.staff?.displayName}</p>
                                    <p className="text-sm text-gray-500">{booking.staff?.role}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Ngày</p>
                                    <p className="text-secondary-600">{formatDate(booking.date)}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Giờ</p>
                                    <p className="text-secondary-600">{booking.time}</p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Khách Hàng</p>
                                    <p className="text-secondary-600">{booking.customerInfo?.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Điện Thoại</p>
                                    <p className="text-secondary-600">{booking.customer?.phone}</p>
                                </div>
                            </div>

                            {booking.customer?.email && (
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-secondary-800">Email</p>
                                        <p className="text-secondary-600">{booking.customer?.email}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-secondary-800">Địa Điểm</p>
                                    <p className="text-secondary-600">123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {booking.customer?.notes && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold text-secondary-800 mb-2">Ghi Chú:</p>
                            <p className="text-secondary-600">{booking.customer.notes}</p>
                        </div>
                    )}
                </div>

                {
                    loading || isEmpty(promotions) ? null : (
                        <div className="card p-6 mb-6">
                            <h4 className="text-xl font-semibold text-secondary-800 mb-4">Ưu Đãi Áp Dụng</h4>

                            <div className="grid md:grid-cols-2 gap-5">


                                {
                                    promotions.map(
                                        (promotion) => (
                                            <div key={promotion.id}
                                                onClick={
                                                    () => {
                                                        onVoucherSelect(promotion);
                                                    }
                                                }
                                                className={
                                                    twMerge(
                                                        "border p-5 rounded cursor-pointer relative",
                                                        booking?.voucher?.id === promotion.id ? "border-primary-500 bg-primary-50" : ""
                                                    )
                                                }
                                            >


                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-semibold text-secondary-800 truncate">{promotion.title}</p>
                                                    <span className="text-sm font-medium text-green-600">
                                                        -{formatPrice(promotion.value)}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-5">
                                                    <p className="text-sm text-secondary-600 truncate grow">
                                                        {promotion.description}
                                                    </p>
                                                    <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded">
                                                        {promotion.code}
                                                    </span>
                                                </div>

                                            </div>
                                        )
                                    )

                                }
                            </div>
                        </div>
                    )
                }

                {/* Price Summary */}
                <div className="card p-6 mb-6">
                    <h4 className="text-xl font-semibold text-secondary-800 mb-4">Chi Tiết Thanh Toán</h4>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-secondary-600">Dịch vụ: {booking.service?.name}</span>
                            <span className="font-semibold">{formatPrice(booking.service?.price || 0)}</span>
                        </div>
                        {
                            booking?.voucher ? (
                                <div className="flex justify-between">
                                    <span className="text-secondary-600">Ưu đãi áp dụng: {booking.voucher.title}</span>
                                    <span className="font-semibold text-green-600">- {formatPrice(booking.voucher.value || 0)}</span>
                                </div>
                            ) : null
                        }
                        <div className="border-t pt-3">
                            <div className="flex justify-between text-lg">
                                <span className="font-semibold text-secondary-800">Tổng cộng:</span>
                                <span className="font-bold text-primary-600">
                                    {
                                        booking.voucher ? formatPrice(
                                            Math.max(
                                                (booking.service?.price || 0) - (booking.voucher?.value || 0),
                                                0
                                            )
                                        ) : formatPrice((booking.service?.price || 0))
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                        <p className="text-sm text-primary-700">
                            <strong>Lưu ý:</strong> Thanh toán tại salon sau khi hoàn thành dịch vụ
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={onPrevious}
                        className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 text-secondary-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                        <span>← Quay Lại</span>
                    </button>

                    {/* Confirmation Button */}
                    <button
                        onClick={handleConfirmBooking}
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-8 py-4 btn-primary text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {
                            isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Đang xử lý...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{`Xác nhận ${booking.paymentMethod === PAYMENT_METHODS.CASH ? "Đặt Lịch" : "Thanh Toán và Đặt lịch"}`}</span>
                                </>
                            )
                        }
                    </button>
                </div>

                <p className="text-sm text-center text-secondary-500 mt-4">
                    Bằng cách xác nhận, bạn đồng ý với điều khoản và chính sách của Royal Barber
                </p>
            </div>
        </div>
    );
};

export default BookingConfirmation;