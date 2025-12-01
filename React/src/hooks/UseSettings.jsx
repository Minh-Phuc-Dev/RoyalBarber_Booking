import DashboardService from "@src/services/DashboardService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const useSettings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            const { payload, success } = await DashboardService.getSettings()
            setLoading(false);
            if (success) {
                setSettings(payload);
            } else {
                toast.error("Đã có lỗi xảy ra khi tải danh sách đặt lịch.");
            }
        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { settings, loading, error, fetch, setSettings, setLoading, setError };
}

export {
    useSettings
};

