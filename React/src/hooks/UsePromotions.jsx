import PromotionService from "@src/services/PromotionService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const usePromotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(
        async () => {
            const { payload, success } = await PromotionService.getPromotions()
            setLoading(false);
            if (success) {
                setPromotions(payload);
            } else {
                toast.error("Đã có lỗi xảy ra khi tải danh sách khuyến mãi.");
            }

        },
        []
    )


    useEffect(() => {
        fetch()
    }, [fetch]);

    return { promotions, loading, error, fetch, setPromotions, setLoading, setError };
}

export {
    usePromotions
};

