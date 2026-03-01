const Helper = {
    getDay(date: string): string {
        const [day, month, year] = date.split('/');
        return Number(day).toString(); // "07" -> "7"
    },

    /**
     * Format date to DD/MM/YYYY string
     * @param date - Date object to format
     * @returns Formatted date string (DD/MM/YYYY)
     */
    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },

    /**
     * Generate dynamic check-in and check-out dates
     * Check-in: today + 1 day
     * Check-out: check-in + 5 days
     * @returns Object with checkIn and checkOut dates in DD/MM/YYYY format
     */
    generateSearchDates(): { checkIn: string; checkOut: string } {
        const today = new Date();
        
        // Check-in: tomorrow
        const checkInDate = new Date(today);
        checkInDate.setDate(checkInDate.getDate() + 1);
        
        // Check-out: check-in + 5 days
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + 5);
        
        return {
            checkIn: Helper.formatDate(checkInDate),
            checkOut: Helper.formatDate(checkOutDate)
        };
    },

    SearchModule: {
        expectCheckInOutDisplayed(
            checkIn: string,
            checkOut: string
        ): string {
            return `${checkIn} – ${checkOut}`;
        }
    }
};

export { Helper };