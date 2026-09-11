const { JsonResult } = require("src/helpers/JsonResult");
const { HTTP_CODE, HTTP_REASON } = require("src/helpers/HttpStatus");
const { User } = require("src/models/User/UserModel");
const { ExceptionBuilder } = require("src/exceptions/ExceptionBuilder");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { USER_ROLES, USER_STATUS } = require("@enums/index");
const nodemailer = require("nodemailer");
const { UserOTP } = require("@models/UserOTP/UserOTPModel");


const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }
);

class AuthenticateService {
    static async getProfile(id) {
        const user = await User.findByPk(
            id, {
            attributes: ['id', 'email', 'displayName', 'role', 'attributes', 'meta']
        }
        );

        if (!user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.NOT_FOUND,
                "User not found",
            )

        }

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            user,
            HTTP_REASON.OK
        )
    }

    static async login({ password, email, role }) {

        const user = await User.findOne(
            {
                where: {
                    email: email,
                }
            }
        );


        if (user === null) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.NOT_FOUND,
                "User not exists!",
            )
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                "Invalid credentials"
            )

        }

        if (user.getDataValue("status") !== USER_STATUS.ACTIVE) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                "User is not active"
            )
        }

        // Generate JWT token
        const token = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        const sanitizedUser = user.toJSON();
        delete sanitizedUser.password;
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            {
                token: token,
                user: sanitizedUser
            },
            "User login successful"
        )
    }

    static async register({ password, email, displayName, attributes = {} }) {

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.BAD_REQUEST,
                "User already exists with this email",
            )
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
            role: USER_ROLES.CUSTOMER,
            displayName: displayName,
            email: email,
            password: hashedPassword,
            attributes: {
                ...attributes,
                avatar: "/placeholder-avatar.png"
            }
        });

        return JsonResult.builder(
            HTTP_CODE.CREATED,
            HTTP_CODE.CREATED,
            null,
            "User registered successfully"
        )
    }

    static async changePassword({ id, password, newPassword }) {

        const user = await User.findByPk(id);

        if (user === null) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.NOT_FOUND,
                "User not exists!",
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.UNAUTHORIZED,
                HTTP_CODE.UNAUTHORIZED,
                "Forgot password invalid"
            )
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await user.update({ password: hashedPassword });

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            null,
            "Change password successfully"
        )

    }

    static async changeDisplayName({ id, displayName }) {

        const user = await User.findByPk(id);
        if (!user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.NOT_FOUND,
                HTTP_CODE.NOT_FOUND,
                "User not found"
            )
        }

        await user.update({ displayName });

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            null,
            "Change display name successfully"
        )
    }


    static async forgot(body) {
        const { email, resetLink } = body;
        const user = await User.findOne(
            { where: { email } }
        );

        if (!user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "User not found."
            )
        }


        const existOtp = await UserOTP.findOne(
            { where: { userId: user.getDataValue("id") } }
        )


        if (existOtp) {
            await existOtp.destroy();
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await UserOTP.create(
            {
                userId: user.getDataValue("id"),
                email: user.getDataValue("email"),
                otp: otpCode,
                expiredAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        );


        await transporter.sendMail(
            {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: "Your OTP Code",
                html: `
                    <div>
                        <p>Mã: <strong>${otpCode}</strong></p>
                        <p>Sử dụng mã này để đặt lại mật khẩu của bạn. Mã sẽ hết hạn sau 15 phút.</p>
                        <a href="${resetLink}">Đặt lại mật khẩu.</a>
                        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này!</p>
                    </div>
                `
            }
        );

        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            { email },
            "Mã OTP đã được gửi đến email của bạn."
        )
    }

    static async resetPassword(body) {
        const { email, otp, password } = body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.NOT_FOUND,
                "User not found."
            )
        }

        const userOtp = await UserOTP.findOne({ where: { userId: user.id, email, otp } });
        if (!userOtp) {
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.UNAUTHORIZED,
                "Invalid OTP code."
            )
        }
        if (new Date(userOtp.getDataValue("expiredAt")) < new Date()) {
            await userOtp.destroy();
            throw ExceptionBuilder.builder(
                HTTP_CODE.BAD_REQUEST,
                HTTP_CODE.GONE,
                "OTP code has expired."
            )
        }

        await userOtp.destroy();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await user.update({ password: hashedPassword });
        return JsonResult.builder(
            HTTP_CODE.OK,
            HTTP_CODE.OK,
            null,
            "Thay đổi mật khẩu thành công!"
        )

    }
}

module.exports = { AuthenticateService };