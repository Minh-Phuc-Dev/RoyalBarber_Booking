import MediaService from "@services/MediaService.js";
import ServiceService from "@services/ServiceService.js";
import { SERVICE_CATEGORIES, SERVICE_STATUS } from "@src/constants/index.js";
import { formatPrice } from "@utils";
import { Save, Upload, X } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const CreateService = ({ onClose, onSuccess }) => {
    // use react-hook-form for form state and validation
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            category: SERVICE_CATEGORIES.STYLING.value,
            price: 0,
            duration: '',
            status: SERVICE_STATUS.ACTIVE.value,
            image: ''
        }
    });


    const handleImageChange = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const form = new FormData();
            form.append('file', file);

            const { success, payload } = await MediaService.uploadMedia(form);
            if (success) {
                setValue('image', payload);
            }
        } catch (err) {
            console.error('Image upload failed', err);
            alert('Không thể tải ảnh lên. Vui lòng thử lại.');
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        // form submit flag available via isSubmitting
        try {
            // ensure price is numeric (already stored as number by the Controller)
            const priceNumber = Math.round(Number(data.price)) || 0;

            const body = {
                ...data,
                price: priceNumber
            };

            const { success } = await ServiceService.createService(body)
            if (success && onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    };


    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal content */}
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Thêm dịch vụ mới
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        {/* Hình ảnh dịch vụ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hình ảnh dịch vụ
                            </label>
                            <div className="flex items-center space-x-4">
                                <div
                                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                                    {
                                        watch('image') ? (
                                            <img
                                                src={MediaService.getMedia(watch('image'))}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-center">
                                                <Upload className="w-8 h-8 mx-auto mb-1" />
                                                <span className="text-xs">Upload</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e)}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                    >
                                        <Upload className="w-4 h-4 mr-2" />
                                        Chọn ảnh
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        JPG, PNG tối đa 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin cơ bản */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tên dịch vụ */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên dịch vụ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập tên dịch vụ"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">Bắt buộc</p>}
                            </div>

                            {/* Danh mục */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Danh mục <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('category', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                >
                                    {
                                        Object.values(SERVICE_CATEGORIES).map(category => (
                                            <option key={category.value} value={category.value}>{category.name}</option>
                                        )
                                        )
                                    }
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">Bắt buộc</p>}
                            </div>
                        </div>

                        {/* Mô tả */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mô tả dịch vụ
                            </label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                placeholder="Mô tả chi tiết về dịch vụ"
                            />
                        </div>

                        {/* Giá và Thời gian */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giá dịch vụ (VNĐ) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('price', { required: true, valueAsNumber: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập tên dịch vụ"
                                />

                                {
                                    errors.price ? (
                                        <p className="text-red-500 text-sm mt-1">Bắt buộc</p>
                                    ) : (
                                        <p className="text-gray-500 text-sm mt-1">Giá: {formatPrice(watch('price'))} VNĐ</p>
                                    )
                                }
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thời gian (phút) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('duration', { required: true, min: 5, max: 480 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                />
                                {errors.duration && <p className="text-red-500 text-sm mt-1">Thời gian không hợp lệ</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trạng thái <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('status')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                >
                                    {
                                        Object.values(SERVICE_STATUS).map(
                                            status => (
                                                <option key={status.value} value={status.value}>{status.name}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isSubmitting ? 'Đang lưu...' : 'Thêm mới'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateService;
