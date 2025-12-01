function generateCode(prefix = "", length = 8) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${code}`;
}

module.exports = {
    generateCode
};