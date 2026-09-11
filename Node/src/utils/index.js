function generateCode(prefix = "", length = 8) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${code}`;
}

function generate30MinuteSlots(startTime, endTime) {
    const slots = [];

    // Convert "HH:mm" to minutes since midnight
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Convert minutes back to "HH:mm" string
    const minutesToTime = (minutes) => {
        const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mins = String(minutes % 60).padStart(2, '0');
        return `${hours}:${mins}`;
    };

    let currentMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    while (currentMinutes <= endMinutes) {
        slots.push(minutesToTime(currentMinutes));
        currentMinutes += 30;
    }

    return slots;
}

module.exports = {
    generateCode,
    generate30MinuteSlots
};