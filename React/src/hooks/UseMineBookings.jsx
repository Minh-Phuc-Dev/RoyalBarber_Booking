import BookingService from "@services/BookingService.js";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const useMineBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            const { payload, success } = await BookingService.getMineBookings()
            setLoading(false);
            if (success) {
                setBookings(payload);
            } else {
                toast.error("Đã có lỗi xảy ra khi tải danh sách đặt lịch.");
            }
        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { bookings, loading, error, fetch, setBookings, setLoading, setError };
}

export {
    useMineBookings
};

