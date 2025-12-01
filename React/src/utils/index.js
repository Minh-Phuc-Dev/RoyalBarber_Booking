
export function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(
        Number(price)
    );
}

export function formatDuration(duration) {
    if (duration < 60) {
        return `${duration} phút`;
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
}

export function formatDate(date) {
    try {
        return new Intl.DateTimeFormat(
            'vi-VN',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        ).format(new Date(date));

    } catch {
        return ""
    }
}

export function formatDay(date) {
    try {
        return new Intl.DateTimeFormat(
            'vi-VN',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        ).format(new Date(date));

    } catch {
        return ""
    }
}

export const formatDateValue = value => {
    try {
        const date = new Date(value);

        const values = [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getDate().toString().padStart(2, '0')
        ]

        return values.some(isNaN) ? "" : values.join("-");
    } catch {
        return ""
    }
}

/**
 * Generates an array of time slots every 30 minutes between start time and end time.
 * 
 * @param {string} startTime - Start time in "HH:mm" format (e.g., "08:30")
 * @param {string} endTime   - End time in "HH:mm" format (e.g., "20:00")
 * @returns {string[]} Array of time strings, each 30 minutes apart, including both start and end times
 */
export function generate30MinuteSlots(startTime, endTime) {
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

export function getCurrentTimeSlot() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    if (minutes < 30) {
        return `${String(hours).padStart(2, '0')}:30`;
    }

    return `${String(hours + 1).padStart(2, '0')}:00`;
}

export function generateCode(prefix = "", length = 8) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${code}`;
}

export function randomHexColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

export function generateKey() {
    return '_' + Math.random().toString(36).substring(2, 9);
}