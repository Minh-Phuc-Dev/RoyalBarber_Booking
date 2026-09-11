import ServiceService from "@services/ServiceService.js";
import { SERVICE_STATUS } from "@src/constants";
import { useCallback, useEffect, useState } from "react";

const useAvailableServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = useCallback(
        async () => {
            try {
                const { payload, success } = await ServiceService.getServices();
                setLoading(false);
                if (success) {

                    setServices(
                        payload.filter(service => service.status === SERVICE_STATUS.ACTIVE.value)
                    );
                }
            } catch (error) {
                setError(error)
            }
        },
        []
    )


    useEffect(() => {
        fetchServices()
    }, [fetchServices]);

    return { services, loading, error, fetchServices, setServices, setLoading, setError };
}

export {
    useAvailableServices
};

