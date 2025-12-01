import { yupResolver } from '@hookform/resolvers/yup';
import { AuthenticateContext } from '@src/contexts/AuthenticateContext';
import { PAYMENT_METHODS } from '@src/enums';
import { ArrowRight, CheckCircle, Mail, MessageSquare, Phone, Shield, User, Wallet } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập họ tên'),
    phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
    email: yup
        .string()
        .email('Email không hợp lệ')
        .notRequired(),
    paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
    notes: yup.string().max(300, 'Ghi chú tối đa 300 ký tự'),
    agreedToTerms: yup.bool().oneOf([true], 'Vui lòng đồng ý với điều khoản sử dụng')
});

const CustomerInfo = ({ booking, onSubmit }) => {
    const { user } = useContext(AuthenticateContext).store ?? {};

    const defaultValues = {
        name: booking?.customer?.name || user?.displayName || '',
        phone: booking?.customer?.phone || user?.attributes?.phone || '',
        email: booking?.customer?.email || user?.email || '',
        notes: booking?.customer?.notes || '',
        paymentMethod: booking?.paymentMethod || PAYMENT_METHODS.CASH.value,
        agreedToTerms: false
    };


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const notesLength = watch('notes')?.length || 0;

    return (
        <div className="p-6 md:p-8 space-y-5">
            <div className="flex flex-col justify-center items-center">
                <div className="text-center"></div>
                <h2 className="text-3xl font-bold text-secondary-800 mb-3">
                    Thông Tin Liên Hệ
                </h2>
                <p className="text-gray-600 text-lg">
                    Điền thông tin để chúng tôi có thể liên hệ xác nhận lịch hẹn
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                            Họ và Tên *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                {...register('name')}
                                placeholder="Nhập họ và tên của bạn"
                                className={twMerge(
                                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                )}
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                <span>⚠️</span>
                                <span>{errors.name.message}</span>
                            </p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                            Số Điện Thoại *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="Nhập số điện thoại (10-11 số)"
                                className={twMerge(
                                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                )}
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                <span>⚠️</span>
                                <span>{errors.phone.message}</span>
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Chúng tôi sẽ gọi điện xác nhận lịch hẹn trong vòng 30 phút</span>
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                            Email (Tùy chọn)
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Nhập địa chỉ email để nhận thông báo"
                                className={twMerge(
                                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                )}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                <span>⚠️</span>
                                <span>{errors.email.message}</span>
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Nhận thông báo lịch hẹn và ưu đãi đặc biệt qua email</span>
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                            Phương thức thanh toán *
                        </label>
                        <div className="relative">
                            <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                            <select
                                {...register('paymentMethod')}
                                className={twMerge(
                                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                )}
                            >
                                {
                                    Object.values(PAYMENT_METHODS).map(
                                        method => (
                                            <option key={method.value} value={method.value}>{method.name}</option>
                                        )
                                    )
                                }
                            </select>

                        </div>
                        {
                            errors.paymentMethod && (
                                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>{errors.paymentMethod.message}</span>
                                </p>
                            )
                        }
                    </div>



                    {/* Notes Field */}
                    <div >
                        <label className="block text-sm font-semibold text-secondary-700 mb-2">
                            Ghi Chú & Yêu Cầu Đặc Biệt(Tùy chọn)
                        </label >
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <textarea
                                {...register('notes')}
                                placeholder="Ví dụ: Kiểu tóc mong muốn, dị ứng với sản phẩm nào, yêu cầu về thời gian..."
                                rows={4}
                                maxLength={300}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500">
                                Giúp stylist hiểu rõ nhu cầu của bạn để phục vụ tốt nhất
                            </p>
                            <span className="text-xs text-gray-400">
                                {notesLength}/300
                            </span >
                        </div >
                        {
                            errors.notes && (
                                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>{errors.notes.message}</span>
                                </p>
                            )
                        }
                    </div >

                    {/* Terms and Conditions */}
                    < div className="space-y-4" >
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register('agreedToTerms')}
                                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="terms" className="text-sm text-secondary-600 leading-relaxed">
                                Tôi đồng ý với{' '}
                                <a href="#" className="text-primary-600 hover:underline font-medium">
                                    điều khoản sử dụng
                                </a>{' '}
                                và{' '}
                                <a href="#" className="text-primary-600 hover:underline font-medium">
                                    chính sách bảo mật
                                </a>{' '}
                                của Royal Barber.Tôi cho phép salon sử dụng thông tin cá nhân để liên hệ xác nhận lịch hẹn và gửi thông báo dịch vụ.
                            </label >
                        </div >
                        {
                            errors.agreedToTerms && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                    <span>⚠️</span>
                                    <span>{errors.agreedToTerms.message}</span>
                                </p>
                            )
                        }
                    </div >

                    {/* Submit Button */}
                    < div className="pt-6" >
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={twMerge(
                                'w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200',
                                isValid
                                    ? 'btn-primary shadow-lg hover:shadow-xl'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            )}
                        >
                            <span>Tiếp Theo: Xác Nhận Đặt Lịch</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div >
                </form >

                {/* Important Notes */}
                < div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-100" >
                    <div className="flex items-center space-x-2 mb-3">
                        <Shield className="w-5 h-5 text-primary-600" />
                        <h4 className="font-semibold text-primary-800">Lưu Ý Quan Trọng</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-primary-700">
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-0.5">•</span>
                            <span>Vui lòng có mặt đúng giờ hẹn để đảm bảo chất lượng dịch vụ tốt nhất</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-0.5">•</span>
                            <span>Chúng tôi sẽ gọi điện xác nhận lịch hẹn trong vòng 30 phút</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-0.5">•</span>
                            <span>Để hủy hoặc thay đổi lịch hẹn, vui lòng liên hệ trước ít nhất 2 giờ</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-0.5">•</span>
                            <span>Mang theo CMND/CCCD khi đến salon để xác nhận danh tính</span>
                        </li>
                    </ul>
                </div >

                {/* Privacy Notice */}
                < div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200" >
                    <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-gray-600" />
                        <h4 className="font-semibold text-secondary-800">Bảo Mật Thông Tin</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Thông tin cá nhân của bạn được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn quốc tế.
                        Chúng tôi chỉ sử dụng thông tin để liên hệ xác nhận lịch hẹn và cải thiện chất lượng dịch vụ.
                        Royal Barber cam kết không chia sẻ thông tin với bên thứ ba.
                    </p >
                </div >
            </div >
        </div >
    );
};

export default CustomerInfo;