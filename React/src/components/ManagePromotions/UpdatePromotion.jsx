import { yupResolver } from '@hookform/resolvers/yup';
import PromotionService from '@services/PromotionService.js';
import { PROMOTION_STATUS } from '@src/enums/index.js';
import useBoolean from '@src/hooks/UseBoolean';
import { formatDay, formatPrice } from '@src/utils';
import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

const schema = yup.object().shape(
    {
        title: yup.string().required('Bắt buộc'),
        description: yup.string().required('Bắt buộc'),
        value: yup.number().min(1, 'Phải lớn hơn 0').required('Bắt buộc'),
        code: yup.string().required('Bắt buộc'),
        startDate: yup.date().required('Bắt buộc'),
        endDate: yup.date().min(
            yup.ref('startDate'),
            'Ngày kết thúc phải sau ngày bắt đầu'
        ).required('Bắt buộc'),
        total: yup.number().min(1, 'Phải lớn hơn 0').required('Bắt buộc'),
        status: yup.string().required('Bắt buộc'),
    }
);

//TODO: Fix bug date
const UpdatePromotion = ({ onSuccess, promotion, className, children }) => {
    const [open, setOpen] = useBoolean(false);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        values: {
            title: promotion.title,
            description: promotion.description,
            value: promotion.value,
            code: promotion.code,
            startDate: formatDay(promotion.startDate).split('/').reverse().join('-'),
            endDate: formatDay(promotion.endDate).split('/').reverse().join('-'),
            total: promotion.total,
            status: promotion.status,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { success } = await PromotionService.updatePromotion(
            {
                id: promotion.id,
                ...data
            }
        );

        if (success) {
            toast.success("Thao tác thành công");
        } else {
            toast.error("Thao tác thất bại");
        }

        if (success && onSuccess) {
            onSuccess();
        }
    };

    return (
        <>
            <button
                onClick={setOpen.on}
                className={className}
            >
                {children}
            </button>
            {
                open ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={setOpen.off} />
                            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900">Thông tin khuyến mãi</h2>
                                    <button onClick={setOpen.off} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Tên khuyến mãi <span className="text-red-500">*</span></label>
                                        <input type="text" {...register('title')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Mô tả <span className="text-red-500">*</span></label>
                                        <textarea {...register('description')} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Giá trị giảm <span className="text-red-500">*</span></label>
                                            <input type="number" {...register('value')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                            <p className="text-xs text-gray-500 mt-1">{formatPrice(watch('value'))}</p>
                                            {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Mã khuyến mãi <span className="text-red-500">*</span></label>
                                            <input type="text" {...register('code')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu <span className="text-red-500">*</span></label>
                                            <input type="date" {...register('startDate')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Ngày kết thúc <span className="text-red-500">*</span></label>
                                            <input type="date" {...register('endDate')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Số lượng <span className="text-red-500">*</span></label>
                                            <input type="number" {...register('total')} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                            {errors.total && <p className="text-red-500 text-sm mt-1">{errors.total.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Trạng thái <span className="text-red-500">*</span></label>
                                            <select {...register('status')} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                                {
                                                    Object.values(PROMOTION_STATUS).map(
                                                        status => (
                                                            <option key={status.value} value={status.value}>{status.name}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                        <button type="button" onClick={setOpen.off} disabled={isSubmitting} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50">Hủy</button>
                                        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-[#FF8800] hover:bg-orange-600 text-white rounded-lg font-medium flex items-center disabled:opacity-50">
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting ? 'Đang lưu...' : 'Lưu thay'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    );
};

export default UpdatePromotion;
