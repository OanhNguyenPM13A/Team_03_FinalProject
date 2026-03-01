function pad(n: number): string {
    return n.toString().padStart(2, '0');
}

function formatDate(date: Date): string {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

const Helper = {
    getDay(date: string): string {
        const [day] = date.split('/');
        return Number(day).toString();
    },

    /** Returns a check-in date N days from today, and check-out M days after check-in. */
    futureDateRange(daysFromNow = 3, stayDays = 7): { checkIn: string; checkOut: string } {
        const now = new Date();
        const checkIn = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysFromNow);
        const checkOut = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + stayDays);
        return { checkIn: formatDate(checkIn), checkOut: formatDate(checkOut) };
    },

    SearchModule: {
        expectCheckInOutDisplayed(checkIn: string, checkOut: string): string {
            return `${checkIn} – ${checkOut}`;
        }
    }
};

export { Helper };