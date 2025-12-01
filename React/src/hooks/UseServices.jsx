import ServiceService from "@services/ServiceService.js";
import {useCallback, useEffect, useState} from "react";

const useServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchServices = useCallback(
        async () => {
            try {
                const {payload, success} = await ServiceService.getServices()
                setLoading(false);
                if (success) {
                    setServices(payload);
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

export  {
    useServices
}