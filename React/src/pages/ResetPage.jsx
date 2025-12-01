import { yupResolver } from "@hookform/resolvers/yup";
import useBoolean from "@src/hooks/UseBoolean";
import AuthenticateService from "@src/services/AuthenticateService";
import { Eye, EyeClosed, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as Yub from "yup";

const ResetPage = () => {
    const [searchParams] = useSearchParams();
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useBoolean(false);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm(
        {
            defaultValues: {
                email: searchParams.get("email") || ""
            },
            resetOptions: false,
            resolver: (
                yupResolver(
                    Yub.object().shape(
                        {
                            email: Yub.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
                            otp: Yub.string().length(6, "Mã OTP phải có 6 ký tự").required("Vui lòng nhập mã OTP"),
                            password: Yub.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
                            confirmPassword: Yub.string().oneOf([Yub.ref("password"), null], "Mật khẩu xác nhận không khớp").required("Vui lòng xác nhận mật khẩu")
                        }
                    )
                )
            )
        }
    );

    const onSubmit = async (payload) => {

        const { success, code } = await AuthenticateService.reset(payload)

        if (success) {
            toast.success("Thao tác thành công! Bạn có thể đăng nhập lại với mật khẩu mới.");
            navigation("/login")
            return
        }

        if (code === 410) {
            toast.error("Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.");
            return
        }

        if (code === 401) {
            toast.error("Mã OTP không hợp lệ. Vui lòng kiểm tra lại.");
            return
        }

        toast.error("Thao tác thất bại! Vui lòng kiểm tra lại thông tin.");
    }


    return (
        <div className="max-w-md mx-auto py-40">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <h1 className="text-2xl font-bold text-center">Quên Mật Khẩu</h1>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        readOnly
                        type="email"
                        placeholder="Nhập email của bạn"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 read-only:opacity-50 cursor-not-allowed ${errors.email ? "border-red-500" : ""}`}
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                        )
                    }
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Nhập mã OTP"
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.otp ? "border-red-500" : ""}`}
                        {...register("otp")}
                    />
                    {
                        errors.otp && (
                            <p className="text-xs text-red-600 mt-1">{errors.otp.message}</p>
                        )
                    }
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.password ? "border-red-500" : ""}`}
                        {...register("password")}
                    />
                    {
                        showPassword ? (
                            <Eye onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        ) : (
                            <EyeClosed onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        )
                    }
                    {
                        errors.password && (
                            <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                        )
                    }
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu mới"
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        {...register("confirmPassword")}
                    />
                    {
                        showPassword ? (
                            <Eye onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        ) : (
                            <EyeClosed onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        )
                    }
                    {
                        errors.confirmPassword && (
                            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                        )
                    }
                </div>

                <div>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary-600 font-semibold hover:underline"
                    >
                        Yêu cầu mã OTP mới?
                    </Link>
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {
                        isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang gửi...</span>
                            </div>
                        ) : (
                            "Gửi yêu cầu đặt lại mật khẩu"
                        )
                    }
                </button>


                <div className="text-center text-sm space-y-2">

                    <span>Chưa có tài khoản? </span>

                    <Link
                        to="/register"
                        className="text-primary-600 font-semibold hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </form>

        </div>




    )
};

export default ResetPage;