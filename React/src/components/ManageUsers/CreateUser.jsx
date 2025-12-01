import { yupResolver } from '@hookform/resolvers/yup';
import MediaService from "@services/MediaService.js";
import UserService from "@services/UserService.js";
import { ROLES, USER_STATUS } from "@src/enums/index.js";
import { isEmpty } from "lodash";
import { Save, Upload, X } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Bắt buộc'),
    displayName: yup.string().required('Bắt buộc'),
    role: yup.string().required(),
    status: yup.string().required(),
    attributes: yup.object().shape({
        phone: yup.string().matches(/^[0-9+()\-\\s]*$/, 'Số điện thoại không hợp lệ').nullable(),
        address: yup.string().nullable(),
        note: yup.string().nullable(),
        avatar: yup.string().nullable()
    })
});

const CreateUser = ({ onClose, onSuccess }) => {
    // use react-hook-form for form state and validation
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            role: ROLES.STAFF.value,
            displayName: '',
            attributes: {
                phone: "",
                address: "",
                note: "",
                avatar: ""
            },
            status: USER_STATUS.ACTIVE.value
        },
        resolver: yupResolver(schema),
    });



    const handleImageChange = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const form = new FormData();
            form.append('file', file);

            const { success, payload } = await MediaService.uploadMedia(form);
            if (success) {
                setValue('attributes.avatar', payload);
            }
        } catch (err) {
            console.error('Image upload failed', err);
            alert('Không thể tải ảnh lên. Vui lòng thử lại.');
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        // form submit flag available via isSubmitting
        try {
            const { attributes, ...body } = data;

            Object.entries(attributes).forEach(
                ([key, value]) => {
                    if (isEmpty(value)) {
                        delete attributes[key];
                    }
                }
            )

            const payload = {
                ...body,
            }

            if (!isEmpty(attributes)) {
                payload.attributes = attributes;
            }
            const { success } = await UserService.createUser(payload);
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
                            Thêm tài khoản mới
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ảnh đại diện
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


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    <span>Phân quyền</span>
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('role', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                >
                                    {
                                        Object.values(ROLES).map(category => (
                                            <option key={category.value} value={category.value}>{category.name}</option>
                                        )
                                        )
                                    }
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">Bắt buộc</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    <span>Trạng thái</span>
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('status', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                >
                                    {
                                        Object.values(USER_STATUS).map(category => (
                                            <option key={category.value} value={category.value}>{category.name}</option>
                                        )
                                        )
                                    }
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">Bắt buộc</p>}
                            </div>
                            <hr className="md:col-span-2" />

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 space-x-1">
                                    <span>Tên hiển thị</span>
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('displayName', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập tên hiển thị"
                                />
                                {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 space-x-1">
                                    <span>Mật khẩu</span>
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password', { required: true })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập mật khẩu"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 space-x-1">
                                    <span>Email</span>
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('email')}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập email người dùng"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 space-x-1">
                                    <span>Số điện thoại</span>
                                </label>
                                <input
                                    type="text"
                                    {
                                    ...register('attributes.phone', {
                                        required: false
                                    }
                                    )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập số điện thoại người dùng"
                                />
                                {errors.attributes?.phone && <p className="text-red-500 text-sm mt-1">{errors.attributes?.phone.message}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 space-x-1">
                                    <span>Địa chỉ</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('attributes.address', { required: false })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Nhập địa chỉ người dùng"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Ghi chú
                                </label>
                                <textarea
                                    {...register('attributes.note')}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8800] focus:border-transparent"
                                    placeholder="Mô tả chi tiết về người dùng"
                                />
                            </div>


                        </div>


                        {/* Buttons */}
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

export default CreateUser;
