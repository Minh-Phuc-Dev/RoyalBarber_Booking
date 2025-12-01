import { SERVICE_CATEGORIES } from "@src/constants/index.js";
import { ToggleRight } from "lucide-react";

export const StatusBadge = ({ isActive }) => {
    if (isActive)
        return (
            <p
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold"
            >
                <ToggleRight className="w-4 h-4 text-green-500" />
                <span>Hoạt động</span>
            </p>
        );
    return (
        <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold"
        >
            Tạm ngưng
        </span>
    );
};

const CATEGORY_STYLES = {
    [SERVICE_CATEGORIES.STYLING.value]: 'bg-blue-50 text-blue-600',
    [SERVICE_CATEGORIES.TREATMENT.value]: 'bg-green-50 text-green-600',
    [SERVICE_CATEGORIES.COLORING.value]: 'bg-purple-50 text-purple-600',
    [SERVICE_CATEGORIES.SPECIAL_COMBO.value]: 'bg-orange-50 text-orange-600',
    [SERVICE_CATEGORIES.HAIRCUT.value]: 'bg-red-50 text-red-600',
    [SERVICE_CATEGORIES.BEARD.value]: 'bg-gray-50 text-gray-600',
    [SERVICE_CATEGORIES.EXTENSIONS.value]: 'bg-pink-50 text-pink-600',
};

export function CategoryBadge({ category }) {

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_STYLES[category] || "bg-gray-50 text-gray-600"}`}
        >
            {SERVICE_CATEGORIES[category]?.name || "Khác"}
        </span>
    );
}