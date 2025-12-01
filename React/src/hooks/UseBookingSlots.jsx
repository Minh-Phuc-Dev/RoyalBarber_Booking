import BookingService from "@services/BookingService.js";
import { useCallback, useEffect, useState } from "react";

const useBookingSlots = (serviceId, staffId, date) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            try {
                setLoading(true);
                const { payload, success } = await BookingService.getSlots(serviceId, staffId, date);
                setLoading(false);
                if (success) {
                    setSlots(payload);
                }
            } catch (error) {
                setError(error)
            }
        },
        [serviceId, staffId, date]
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { slots, loading, error, fetch, setSlots, setLoading, setError };
}

export {
    useBookingSlots
};

