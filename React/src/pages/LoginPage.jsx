import { yupResolver } from "@hookform/resolvers/yup";
import { AUTHENTICATE_STATUS, useAuthenticate } from "@src/contexts/AuthenticateContext";
import { ROLES } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import AuthenticateService from "@src/services/AuthenticateService";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yub from "yup";

const LoginPage = () => {
    const navigation = useNavigate();
    const { setStore } = useAuthenticate();
    const [showPassword, setShowPassword] = useBoolean(false);
    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting }
    } = useForm(
        {
            defaultValues: {
                email: "",
                password: ""
            },
            resetOptions: false,
            resolver: (
                yupResolver(
                    Yub.object().shape({
                        email: Yub.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
                        password: Yub.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu")
                    })
                )
            )
        }
    );

    const onSubmit = async (data) => {

        const { success, payload } = await AuthenticateService.login(data)

        if (success) {
            toast.success("Đăng nhập thành công! Chào mừng bạn trở lại.");
            setStore(
                {
                    user: payload.user,
                    status: AUTHENTICATE_STATUS.AUTHENTICATED
                }
            )
            localStorage.setItem("token", payload.token);
            navigation(payload?.user?.role === ROLES.ADMIN.value ? "/manage/dashboard" : "/")
            return
        }

        toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }


    return (
        <div className="max-w-md mx-auto py-40">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <h1 className="text-2xl font-bold text-center">Đăng Nhập Tài Khoản</h1>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.email ? "border-red-500" : ""}`}
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                        )
                    }
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.password ? "border-red-500" : ""}`}
                        {
                        ...register("password")
                        }
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
                <div>

                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary-600 font-semibold hover:underline justify-end flex"
                    >
                        Quên mật khẩu?
                    </Link>

                </div>

                <button
                    // type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {
                        isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang đăng nhập...</span>
                            </div>
                        ) : (
                            "Đăng Nhập"
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

export default LoginPage;