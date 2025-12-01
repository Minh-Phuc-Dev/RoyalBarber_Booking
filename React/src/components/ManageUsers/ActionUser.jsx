import { USER_STATUS } from "@src/enums";
import useBoolean from "@src/hooks/UseBoolean";
import UserService from "@src/services/UserService";
import { Ban, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";


const ActionUser = ({ user, onSuccess }) => {
    const [open, setOpen] = useBoolean(false);


    return (
        <>
            {
                <button
                    onClick={setOpen.on}
                    className={
                        twMerge(
                            user.status === USER_STATUS.ACTIVE.value ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900',
                            "transition-colors"
                        )
                    }
                    title={user.status === USER_STATUS.ACTIVE.value ? 'Vô hiệu hóa' : 'Kích hoạt'}
                >
                    {
                        user.status === USER_STATUS.ACTIVE.value ? (
                            <Ban className="w-4 h-4" />
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )
                    }
                </button>
            }
            {
                open ? (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">

                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                                onClick={setOpen.off}
                            />

                            <div className="relative bg-white rounded-2xl shadow-xl min-w-96  max-h-[90vh] overflow-y-auto">

                                <div className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Xác nhận hành động
                                    </h2>
                                    <button
                                        onClick={setOpen.off}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-gray-700 px-6 py-4">
                                        Bạn có chắc chắn muốn {user.status === USER_STATUS.ACTIVE.value ? 'vô hiệu hóa' : 'kích hoạt'} người dùng này không?
                                    </p>
                                    <div className="flex justify-end gap-3 px-6 py-2 border-t border-gray-200">
                                        <button
                                            onClick={setOpen.off}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={
                                                async () => {

                                                    const { success } = await UserService.updateUser(

                                                        {
                                                            id: user.id,
                                                            status: user.status === USER_STATUS.ACTIVE.value ? USER_STATUS.SUSPENDED.value : USER_STATUS.ACTIVE.value
                                                        }

                                                    )
                                                    if (success) {
                                                        setOpen.off();
                                                        onSuccess();
                                                        toast.success("Thao tác thành công!");
                                                        return
                                                    }
                                                    toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                                                }
                                            }
                                            className={
                                                twMerge(
                                                    user.status === USER_STATUS.ACTIVE.value ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700',
                                                    "px-4 py-2 rounded-lg text-white transition-colors"
                                                )
                                            }
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null

            }
        </>
    )

}
export default ActionUser;