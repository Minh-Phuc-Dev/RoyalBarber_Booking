import { useAuthenticate } from "@src/contexts/AuthenticateContext";
import MediaService from "@src/services/MediaService";
import { Camera, Edit, Mail, MapPin, Phone, Save, Star, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
    const { store: { user } } = useAuthenticate();
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm(
        {
            defaultValues: {
                name: user?.displayName || "",
                email: user?.email || "",
                phone: user?.attributes?.phone || "",
                address: user?.attributes?.address || ""
            }
        }
    );

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        reset({
            name: user?.displayName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || ""
        });
        setIsEditing(false);
    };

    const onSubmit = (data) => {
        // TODO: Call API to update user profile here
        // Example: await updateUserProfile(data);
        setIsEditing(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                {/* <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ Sơ Cá Nhân</h1>
                    <p className="text-gray-600">Quản lý thông tin của bạn</p>
                </div> */}

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                    {user?.attributes?.avatar ? (
                                        <img src={MediaService.getMedia(user?.attributes?.avatar)} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-white text-4xl font-bold">
                                            {user?.displayName?.charAt(0) || "U"}
                                        </span>
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-[#FF8800] hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-4 text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="font-semibold text-gray-900">4.7</span>
                                    <span className="text-gray-500">(23 đánh giá)</span>
                                </div>
                                <p className="text-sm text-gray-500">Thành viên của Royal Barber</p>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Chỉnh sửa
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleSubmit(onSubmit)}
                                            className="flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                            disabled={!isDirty}
                                        >
                                            <Save className="w-4 h-4" />
                                            Lưu
                                        </button>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <User className="w-4 h-4 inline mr-1" />
                                            Họ và tên
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "Vui lòng nhập họ tên" })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{user?.displayName}</p>
                                            )
                                        }
                                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4 inline mr-1" />
                                            Email
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="email"
                                                    {
                                                    ...register("email", {
                                                        required: "Vui lòng nhập email",
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: "Email không hợp lệ"
                                                        }
                                                    }
                                                    )
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{user?.email}</p>
                                            )
                                        }
                                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-1" />
                                            Số điện thoại
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{user?.attributes?.phone}</p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-1" />
                                            Địa chỉ
                                        </label>
                                        {
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("address")}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900 font-medium">{user?.attributes?.address || "Chưa cập nhật"}</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
