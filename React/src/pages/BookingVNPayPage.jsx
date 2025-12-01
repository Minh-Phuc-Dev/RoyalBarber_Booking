import BookingService from '@src/services/BookingService';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";


const BookingVNPayPage = () => {

    const [status, setStatus] = useState("PROCESSING")


    const verifyPayment = useCallback(
        async () => {
            const { success } = await BookingService.completeBooking(window.location.search)
            if (success) {
                setStatus("SUCCESS")
            } else {
                setStatus("FAILED")
            }
        }, []
    )

    useEffect(
        () => {
            verifyPayment()
        }, [verifyPayment]
    )


    return status === "SUCCESS" ? (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-semibold mb-2">Thanh Toán Thành Công!</h1>
                <p className="text-gray-600 mb-6">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Lịch hẹn của bạn đã được xác nhận.</p>
                <Link
                    to="/my-appointments"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Xem Lịch Hẹn Của Tôi
                </Link>
            </div>
        </div>
    ) : status === "FAILED" ? (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold mb-2 text-red-500">Thanh Toán Thất Bại!</h1>
                <p className="text-gray-600 mb-6">Rất tiếc, đã có lỗi xảy ra trong quá trình xử lý thanh toán của bạn. Vui lòng thử lại.</p>
                <div className="flex flex-col mx-auto w-56">
                    <button
                        onClick={verifyPayment}
                        className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mb-4"
                    >
                        <span>Thử Lại</span>

                    </button>
                    <Link
                        to="/booking"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay Lại Đặt Lịch
                    </Link>
                </div>


            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-pulse">
                <h1 className="text-2xl font-semibold mb-2">Đang Xử Lý Thanh Toán...</h1>
                <p className="text-gray-600 mb-6">Vui lòng chờ trong giây lát.</p>
            </div>
        </div>
    );
};

export default BookingVNPayPage;
