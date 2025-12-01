import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import CalendarPicker from "@src/components/Shared/Calendar";
import { useBookingSlots } from '@src/hooks/UseBookingSlots';
import { formatDateValue, formatDay, generate30MinuteSlots } from "@src/utils";
import { Calendar, ChevronsUpDown } from 'lucide-react';

import { twMerge } from "tailwind-merge";




const DateTimeSelection = ({ booking, onTimeSelect, onDateSelect }) => {
    const slots = generate30MinuteSlots(
        "08:00",
        "23:00"
    );


    const { slots: takeSlots, loading } = useBookingSlots(booking.service.id, booking.staff.id, formatDay(booking.date).split('/').reverse().join('-'));


    return (
        <div className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold">Chọn Ngày và Giờ</h2>

            <div className="grid grid-cols-1 gap-5">
                <div>
                    <div className="relative">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="text-left w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    {formatDateValue(booking.date) || "Chọn ngày..."}
                                </button>

                            </DropdownMenu.Trigger>


                            <DropdownMenu.Portal>
                                <DropdownMenu.Content className="bg-white rounded-md shadow-lg">
                                    <div>
                                        <CalendarPicker
                                            selected={booking.date}
                                            setSelected={
                                                (date) => {
                                                    onDateSelect(date);
                                                }
                                            }
                                        />
                                    </div>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <ChevronsUpDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />


                    </div>

                </div>

                {
                    loading ? null : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 row-span-2">
                                {
                                    slots.map(
                                        (slot) => (
                                            <button
                                                key={slot}
                                                onClick={takeSlots.includes(slot) ? undefined : () => onTimeSelect(slot)}
                                                className={
                                                    twMerge(
                                                        "m-1 px-4 py-2 rounded-md border border-gray-300 hover:bg-primary-500 hover:text-white transition-colors",
                                                        booking.time === slot ? "bg-primary-500 text-white" : "bg-white text-gray-700",
                                                        takeSlots.includes(slot) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                                    )
                                                }
                                            >
                                                {slot}
                                            </button>
                                        )
                                    )
                                }
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-100 rounded"></div>
                                    <span className="text-gray-600">Đã đặt</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
                                    <span className="text-gray-600">Có thể đặt</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-primary-500 rounded"></div>
                                    <span className="text-gray-600">Đã chọn</span>
                                </div>

                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DateTimeSelection;