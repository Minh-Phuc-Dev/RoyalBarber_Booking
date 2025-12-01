import { PROMOTION_STATUS, PROMOTION_TYPE } from "@src/enums";

export function StatusBadge({ status }) {
    return (
        status === PROMOTION_STATUS.ACTIVE.value ? (
            <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                {PROMOTION_STATUS.ACTIVE.name}
            </span>
        ) : status === PROMOTION_STATUS.EXPIRED.value ? (
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">
                {PROMOTION_STATUS.EXPIRED.name}
            </span>
        ) : status === PROMOTION_STATUS.INACTIVE.value ? (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                {PROMOTION_STATUS.INACTIVE.name}
            </span>
        ) : null
    )
}

export function TypeBadge({ type }) {
    return (
        type === PROMOTION_TYPE.PERCENTAGE.value ? (
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                {PROMOTION_TYPE.PERCENTAGE.name}
            </span>
        ) : type === PROMOTION_TYPE.FIXED_AMOUNT.value ? (
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold">
                {PROMOTION_TYPE.FIXED_AMOUNT.name}
            </span>
        ) : null
    )
}
