import BookingService from "@services/BookingService.js";
import { useCallback, useEffect, useState } from "react";

const useStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            try {
                const { payload, success } = await BookingService.getStaff()
                setLoading(false);
                if (success) {
                    setStaff(payload);
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

    return { staff, loading, error, fetch, setStaff, setLoading, setError };
}

export {
    useStaff
};

