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

    /**
     * Scroll down page by specified pixels
     * @param page - Playwright page object
     * @param pixels - Number of pixels to scroll (default: 300)
     */
    async scrollDown(page: any, pixels: number = 300): Promise<void> {
        await page.evaluate((scrollAmount: number) => {
            window.scrollBy(0, scrollAmount);
        }, pixels);
        await page.waitForTimeout(1000);
    },

    /**
     * Scroll gradually to bottom of page
     * Continuously scrolls to bottom and waits for new content to load
     * @param page - Playwright page object
     * @param maxScrolls - Maximum number of scroll iterations (default: 100)
     * @param delayMs - Delay between scrolls in milliseconds (default: 1000)
     */
    async scrollToBottom(page: any, maxScrolls: number = 100, delayMs: number = 2000): Promise<void> {
        let prevHeight = -1;
        let scrollCount = 0;

        while (scrollCount < maxScrolls) {
            // Execute JavaScript to scroll to the bottom of the page
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

            // Wait for new content to load
            await page.waitForTimeout(delayMs);

            // Check whether the scroll height changed - means more pages are there
            const newHeight = await page.evaluate(() => document.body.scrollHeight);

            // If scroll height hasn't changed, we're at the bottom
            if (newHeight === prevHeight) {
                break;
            }

            prevHeight = newHeight;
            scrollCount++;
        }
    },

    SearchModule: {
        expectCheckInOutDisplayed(
            checkIn: string,
            checkOut: string
        ): string {
            return `${checkIn} – ${checkOut}`;
        }
    },

    parseMoney: function (text: string | null | undefined): number {
        if (!text) return 0;
        const cleaned = text.replace(/,/g, '');
        const match = cleaned.match(/\d+/);
        return match ? Number(match[0]) : 0;
    },

    // Helper function to safely parse DD-MM-YYYY date format
    parseDDMMYYYY: function(dateStr: string): Date {
        const m = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
        if (!m) throw new Error(`Invalid date format: ${dateStr}`);
        const [, dd, mm, yyyy] = m;
        const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        if (Number.isNaN(d.getTime())) throw new Error(`Invalid date value: ${dateStr}`);
        return d;
    }
};

export { Helper };