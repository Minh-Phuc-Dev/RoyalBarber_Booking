import { yupResolver } from "@hookform/resolvers/yup";
import AuthenticateService from "@src/services/AuthenticateService";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yub from "yup";

const ForgotPage = () => {
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,

        formState: { errors, isSubmitting }
    } = useForm(
        {
            defaultValues: {
                email: ""
            },
            resetOptions: false,
            resolver: (
                yupResolver(
                    Yub.object().shape(
                        {
                            email: Yub.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
                        }
                    )
                )
            )
        }
    );

    const onSubmit = async ({ email }) => {

        const { success } = await AuthenticateService.forgot(
            {
                email,
                resetLink: `${window.location.origin}/reset-password?email=${email}`
            }
        )

        if (success) {
            toast.success("Thao tác thành công! Vui lòng kiểm tra email để đặt lại mật khẩu.");
            navigation(`/reset-password?email=${email}`)
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

                <div>
                    <Link
                        to="/login"
                        className="text-sm text-primary-600 font-semibold hover:underline"
                    >
                        Quay lại đăng nhập?
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

export default ForgotPage;