import BookingService from "@services/BookingService.js";
import { useCallback, useEffect, useState } from "react";

const useStaffBooking = () => {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            try {
                const { payload, success } = await BookingService.getStaffAppointments()
                setLoading(false);
                if (success) {
                    setBooking(payload);
                }
            } catch (error) {
                setError(error)
            }
        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { booking, loading, error, fetch, setBooking, setLoading, setError };
}

export {
    useStaffBooking
};

