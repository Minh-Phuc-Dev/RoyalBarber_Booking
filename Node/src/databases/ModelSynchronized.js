const { USER_ROLES, USER_STATUS, SERVICE_CATEGORIES, SERVICE_STATUS, PROMOTION_TYPES, PROMOTION_STATUS } = require("@enums/index");
const { Booking } = require("@models/Booking/BookingModel");
const { Promotion } = require("@models/Promotion/PromotionModel");
const { Service } = require("@models/Service/ServiceModel");
const { Transaction } = require("@models/Transaction/TransactionModel");
const { User } = require("@models/User/UserModel");
const { UserOTP } = require("@models/UserOTP/UserOTPModel");
const { generateCode } = require("@utils/index");
const bcrypt = require('bcryptjs');

async function initializeDatabase() {

    await User.findOrCreate(
        {
            where: { email: 'admin@gmail.com' },
            defaults: {
                role: USER_ROLES.ADMIN,
                displayName: "Quản trị viên",
                email: "admin@gmail.com",
                status: USER_STATUS.ACTIVE,
                password: bcrypt.hashSync('12345678', 10),
                attributes: {
                    avatar: "/placeholder-avatar.png",

                }
            }
        }
    )

    await User.findOrCreate(
        {
            where: { email: 'khachhang@gmail.com' },
            defaults: {
                role: USER_ROLES.CUSTOMER,
                displayName: "Khách hàng",
                email: "khachhang@gmail.com",
                status: USER_STATUS.ACTIVE,
                password: bcrypt.hashSync('12345678', 10),
                attributes: {
                    avatar: "/placeholder-avatar.png",
                    phone: "0335840119",
                    address: "Hồ Chí Minh"
                }
            }
        }
    )


    if (await Service.count() === 0) {
        await Service.bulkCreate(
            [
                {
                    name: 'Cắt & Tạo kiểu tóc',
                    description: 'Cắt tạo kiểu với Barber chính hiệu',
                    category: SERVICE_CATEGORIES.HAIRCUT,
                    price: 150000,
                    duration: 60,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a1.png"
                },
                {
                    name: 'Cắt tỉa râu',
                    description: 'Dịch vụ cắt tỉa và tạo kiểu râu chuyên nghiệp',
                    category: SERVICE_CATEGORIES.BEARD,
                    price: 80000,
                    duration: 30,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a2.png"
                },
                {
                    name: 'Nhuộm tóc',
                    description: 'Dịch vụ nhuộm tóc chuyên nghiệp thời thượng',
                    category: SERVICE_CATEGORIES.COLORING,
                    price: 300000,
                    duration: 120,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a3.png"
                },
                {
                    name: 'Gội & Sấy tạo kiểu',
                    description: 'Gội đầu nhanh và sấy tạo kiểu chuyên nghiệp',
                    category: SERVICE_CATEGORIES.STYLING,
                    price: 50000,
                    duration: 30,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a4.png"
                },
                {
                    name: 'Uốn Ruffled',
                    description: 'Dịch vụ uốn tóc tạo kiểu Ruffled thời thượng',
                    category: SERVICE_CATEGORIES.EXTENSIONS,
                    price: 500000,
                    duration: 30,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a5.jpg"
                },
                {
                    name: 'Uốn Con Sâu',
                    description: 'Dịch vụ uốn tóc tạo kiểu Con Sâu cá tính',
                    category: SERVICE_CATEGORIES.TREATMENT,
                    price: 200000,
                    duration: 45,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a6.jpg"

                },
                {
                    name: 'Nối Gáy Dreadlock',
                    description: 'Dịch vụ nối gáy dreadlock chuyên nghiệp',
                    category: SERVICE_CATEGORIES.SPECIAL_COMBO,
                    price: 400000,
                    duration: 120,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a7.png"
                },
                {
                    name: 'Tatoo hình cơ bản',
                    description: 'Dịch vụ tatoo hình cơ bản dành cho nam',
                    category: SERVICE_CATEGORIES.HAIRCUT,
                    price: 100000,
                    duration: 30,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a8.jpg"
                },
                {
                    name: 'Gội xả sạch bay tóc con',
                    description: 'Dịch vụ gội xả làm sạch tóc con và da đầu',
                    category: SERVICE_CATEGORIES.BEARD,
                    price: 50000,
                    duration: 15,
                    status: SERVICE_STATUS.ACTIVE,
                    image: "/a9.png"
                }
            ]
        );

    }

    if (await Promotion.count() === 0) {
        const services = (await Service.findAll()).map(
            service => service.toJSON()
        )
        await Promotion.bulkCreate(
            [
                {
                    title: 'Khuyến mãi mùa hè',
                    description: 'Giảm giá 20.000đ cho tất cả dịch vụ trong mùa hè',
                    value: 20000,
                    code: generateCode("SUMMER", 4),
                    startDate: new Date(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                    total: 500,
                    usage: 0,
                    status: PROMOTION_STATUS.ACTIVE,
                },
                {
                    title: 'Giảm giá dịch vụ cắt tóc',
                    description: 'Giảm ngay 30.000đ cho dịch vụ cắt tóc',
                    value: 30000,
                    code: generateCode("HAIRCUT", 4),
                    startDate: new Date(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                    total: 300,
                    usage: 0,
                    status: PROMOTION_STATUS.ACTIVE,
                },
                {
                    title: "Chào mừng giáng sinh",
                    description: "Giảm giá 25000 cho uốn tóc trong dịp giáng sinh",
                    value: 25000,
                    code: generateCode("XMAS", 4),
                    startDate: new Date(new Date().setMonth(11, 1)),
                    endDate: new Date(new Date().setMonth(11, 31)),
                    total: 200,
                    usage: 0,
                    status: PROMOTION_STATUS.ACTIVE,
                }
            ]
        )
    }
}


// Sync all models
Promise.all(
    [
        User.sync({ alter: true }),
        Service.sync({ alter: true }),
        Booking.sync({ alter: true }),
        Promotion.sync({ alter: true }),
        UserOTP.sync({ alter: true }),
        Transaction.sync({ alter: true }),
    ]
).then(
    () => {
        console.log("All models were synchronized successfully.");
        return initializeDatabase();
    }
).catch(
    error => {
        console.error("Error synchronizing models:", error);
    }
);
