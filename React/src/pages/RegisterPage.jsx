import { yupResolver } from "@hookform/resolvers/yup";
import useBoolean from "@src/hooks/UseBoolean";
import AuthenticateService from "@src/services/AuthenticateService";
import { Eye, EyeClosed, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    address: Yup.string(),
    password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
});

const RegisterPage = () => {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useBoolean(false);




    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {

        const payload = {
            displayName: data.name,
            email: data.email,
            attributes: {
                phone: data.phone,
                address: data.address,
            },
            password: data.password,
        };
        const { success, code } = await AuthenticateService.register(payload);

        if (success) {
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            navigation("/login");
        } else {

            toast.error(code === 429 ? "Đăng ký thất bại, email đã được sử dụng." : "Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="max-w-md mx-auto py-20">
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">


                <h1 className="text-2xl font-bold text-center mb-2">Đăng Ký Tài Khoản</h1>

                <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.name ? "border-red-500" : ""}`}
                        {...register("name")}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.email ? "border-red-500" : ""}`}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        placeholder="Số điện thoại"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.phone ? "border-red-500" : ""}`}
                        {...register("phone")}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
                </div>

                <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Địa chỉ (không bắt buộc)"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500"
                        {...register("address")}
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.password ? "border-red-500" : ""}`}
                        {...register("password")}
                    />
                    {
                        showPassword ? (
                            <Eye onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        ) : (
                            <EyeClosed onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        )
                    }
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        {...register("confirmPassword")}
                    />
                    {
                        showPassword ? (
                            <Eye onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        ) : (
                            <EyeClosed onClick={setShowPassword.toggle} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />

                        )
                    }
                    {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Đang đăng ký...</span>
                        </div>
                    ) : (
                        "Đăng Ký"
                    )}
                </button>

                <div className="text-center">
                    <p className="text-sm">
                        Đã có tài khoản?{" "}
                        <Link
                            to="/login"

                            className="text-primary-600 font-semibold hover:underline"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage