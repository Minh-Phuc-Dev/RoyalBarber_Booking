import { useSettings } from "@src/hooks/UseSettings";
import DashboardService from "@src/services/DashboardService";
import { Save, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



const AdminSettingsPage = () => {

    const { settings, loading } = useSettings();
    const {
        register,
        handleSubmit,
        formState: { isDirty, isSubmitting },
        reset,
        watch,
    } = useForm({ values: loading ? {} : settings });

    const onSubmit = async (data) => {
        const { success, payload } = await DashboardService.updateSettings(data);

        if (success) {
            toast.success("Cài đặt đã được cập nhật thành công.");
            reset(
                payload,
                { keepDirty: false }
            )
        } else {
            toast.error("Đã có lỗi xảy ra khi cập nhật cài đặt.");
        }
    };

    const maintenanceMode = watch("maintenanceMode");

    return (
        <form
            className="w-full min-h-screen bg-[#FAFBFC]"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#1A2233] mb-1">
                        Cài Đặt Hệ Thống
                    </h1>
                    <p className="text-gray-500 text-base">
                        Cấu hình thông tin và cài đặt chung của salon
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    className="mt-4 md:mt-0 flex items-center gap-2 bg-[#FF8800] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-base shadow transition disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    Lưu Thay Đổi
                </button>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Salon Info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-5 h-5 text-[#FF8800]" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Thông Tin Salon
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên Salon
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Địa Chỉ
                            </label>
                            <input
                                {...register("address")}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số Điện Thoại
                            </label>
                            <input
                                {...register("phone")}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Open Hours & Maintenance */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-5 h-5 text-[#1D9BF0]" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Giờ Mở Cửa
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thứ 2 - Thứ 6
                            </label>
                            <input
                                {...register("weekdays")}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thứ 7 - Chủ Nhật
                            </label>
                            <input
                                {...register("weekend")}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>

                        <div className="flex items-center gap-2 mb-4">
                            <Settings className="w-5 h-5 text-[#1D9BF0]" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Trạng thái bảo trì
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Bảo trì hệ thống
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Tạm ngưng hệ thống để bảo trì
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("maintenanceMode")}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${maintenanceMode ? "peer-checked:bg-[#FF8800]" : ""}`}></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AdminSettingsPage;