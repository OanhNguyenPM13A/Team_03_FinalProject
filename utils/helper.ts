const Helper = {
    getDay(date: string): string {
        const [day, month, year] = date.split('/');
        return Number(day).toString(); // "07" -> "7"
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