export const ROLES = {
    ADMIN: {
        value: 'ADMIN',
        name: "Quản trị viên"
    },
    CUSTOMER: {
        value: 'CUSTOMER',
        name: "Người dùng"
    },
    STAFF: {
        value: "STAFF",
        name: "Nhân viên"
    }
}

export const USER_STATUS = {
    ACTIVE: {
        value: 'ACTIVE',
        name: "Hoạt động"
    },
    INACTIVE: {
        value: 'INACTIVE',
        name: "Không hoạt động"
    },
    SUSPENDED: {
        value: 'SUSPENDED',
        name: "Bị khóa"
    }
}

export const PROMOTION_STATUS = {
    ACTIVE: {
        value: 'ACTIVE',
        name: "Đang hoạt động"
    },
    INACTIVE: {
        value: 'INACTIVE',
        name: "Ngưng hoạt động"
    },
    EXPIRED: {
        value: 'EXPIRED',
        name: "Hết hạn"
    }
}

export const PROMOTION_TYPE = {
    PERCENTAGE: {
        value: 'PERCENTAGE',
        name: "Giảm theo phần trăm"
    },
    FIXED_AMOUNT: {
        value: 'FIXED_AMOUNT',
        name: "Giảm theo số tiền cố định"
    }
}

export const PAYMENT_METHODS = {
    CASH: {
        value: 'CASH',
        name: "Tiền mặt"
    },
    BANKING: {
        value: 'BANKING',
        name: "Chuyển khoản"
    }
}

export const BOOKING_STATUS = {
    PENDING: {
        value: 'PENDING',
        name: "Đang xử lý"
    },
    SUCCESS: {
        value: 'SUCCESS',
        name: "Thành công"
    },
    COMPLETED: {
        value: 'COMPLETED',
        name: "Đã hoàn thành"
    },
    CANCELLED: {
        value: 'CANCELLED',
        name: "Đã hủy"
    }
}

export const TIME_RANGE = {
    LATEST_7_DAY: {
        name: "7 ngày qua",
        value: "LATEST_7_DAY"
    },
    LATEST_30_DAY: {
        name: "30 ngày qua",
        value: "LATEST_30_DAY"
    },
    THIS_MONTH: {
        name: "Tháng này",
        value: "THIS_MONTH"
    },
    LATEST_90_DAY: {
        name: "3 tháng qua",
        value: "LATEST_90_DAY"
    }
}