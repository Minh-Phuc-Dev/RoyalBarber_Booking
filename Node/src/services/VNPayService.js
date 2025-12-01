const crypto = require("crypto");
const querystring = require('querystring');


/**
 * Format a date object into a string in the format "yyyymmddHHmmss".
 * @param {Date} date The date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

class VNPayService {
    /**
     * @typedef {Object} VNPayTransaction
     * @property {string} url - The URL to redirect the user to VNPAY
     * @property {Object} params - The params data
     * @property {number} params.vnp_Amount
     * @property {string} params.vnp_CreateDate
     * @property {string} params.vnp_Command
     * @property {string} params.vnp_IpAddr
     * @property {string} params.vnp_Locale
     * @property {string} params.vnp_OrderInfo
     * @property {string} params.vnp_OrderType
     * @property {string} params.vnp_ReturnUrl
     * @property {string} params.vnp_TmnCode
     * @property {string} params.vnp_TxnRef
     *
     * Create transaction
     * @async
     * @static
     * @param {number} amount
     * @returns {Promise<VNPayTransaction>}
     *
     */
    static async generateUrl(amount, bookingId) {
        const ip = "127.0.0.1";

        const VNPAY_URL = process.env.VNPAY_URL

        const params = {
            'vnp_Command': 'pay',
            'vnp_Amount': amount * 100,
            'vnp_CreateDate': formatDate(new Date()),
            'vnp_CurrCode': "VND",
            'vnp_IpAddr': ip,
            'vnp_Locale': "vn",
            'vnp_OrderInfo': "Purchase",
            'vnp_OrderType': "other",
            'vnp_ReturnUrl': process.env.VNPAY_CALLBACK_URL,
            'vnp_TmnCode': process.env.VNPAY_CODE,
            'vnp_TxnRef': bookingId ?? crypto.randomUUID().toString(),
            'vnp_Version': '2.1.0',
        };

        const sortedParams = Object.fromEntries(Object.entries(params).sort());

        const signData = querystring.stringify(sortedParams);

        const hmac = crypto.createHmac("sha512", process.env.VNPAY_HASH_SECRET);

        const query = querystring.stringify(
            Object.assign(
                sortedParams,
                {
                    vnp_SecureHash: hmac.update(Buffer.from(signData, "utf-8")).digest("hex")
                }
            )
        )


        return {
            url: `${VNPAY_URL}?${query}`,
            params: sortedParams
        }
    }
}

module.exports = {
    VNPayService
}