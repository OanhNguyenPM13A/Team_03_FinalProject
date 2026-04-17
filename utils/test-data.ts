import type { UserData } from './api-helper';

/**
 * Generates unique test data for user registration and profile tests.
 * Uses timestamps + counter to avoid collisions across parallel runs.
 */
export class TestDataGenerator {
    private static counter = 0;

    private static uniqueSuffix(): string {
        TestDataGenerator.counter++;
        return `${Date.now()}_${TestDataGenerator.counter}`;
    }

    static validUser(): UserData {
        const suffix = TestDataGenerator.uniqueSuffix();
        return {
            name: `TestUser_${suffix}`,
            email: `testuser_${suffix}@mailtest.com`,
            password: 'Test@12345',
            phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
            birthday: '01/01/1995',
            gender: true,
            role: 'USER',
        };
    }

    static userWithWeakPassword(): UserData {
        const user = TestDataGenerator.validUser();
        user.password = '123';
        return user;
    }

    static profileUpdate(): Omit<UserData, 'password'> {
        const suffix = TestDataGenerator.uniqueSuffix();
        return {
            name: `Updated_${suffix}`,
            email: `updated_${suffix}@mailtest.com`,
            phone: `08${Math.floor(10000000 + Math.random() * 90000000)}`,
            birthday: '15/06/1998',
            gender: false,
        };
    }

    static invalidCredentials() {
        return {
            email: 'nonexistent@fake.com',
            password: 'WrongPassword!999',
        };
    }
}

/**
 * Test data for Search Module
 */
export class SearchTestData {
    // Locations for search tests
    static readonly DEFAULT_LOCATION = 'Hồ Chí Minh';
    static readonly LOCATIONS = {
        primary: 'Hồ Chí Minh',
        secondary: 'Hà Nội',
        alternative: 'Đà Nẵng',
    };

    // Guest count for search tests
    static readonly DEFAULT_GUEST_COUNT = 2;
    static readonly GUEST_COUNTS = {
        single: 1,
        couple: 2,
        group: 3,
        large: 4,
    };

    // Price filter data
    static readonly PRICE_FILTER = {
        minPrice: 20,
        maxPrice: 500,
        defaultMin: 20,
    };

    // Search result messages
    static readonly SEARCH_RESULT_MESSAGES = {
        locationText: 'chỗ ở tại',
        loginRequired: 'Cần đăng nhập để bình luận',
    };

    // Room info pattern
    static readonly ROOM_INFO_PATTERNS = {
        guestInfo: /(\d+)\s*khách/,
    };
}

/**
 * Test data for Room Card and Room Details Modules
 */
export class RoomTestData {
    // Room selection indices
    static readonly ROOM_INDICES = {
        first: 0,
        second: 1,
        third: 2,
    };

    // Room details selectors (reference data)
    static readonly ROOM_DETAILS_FIELDS = {
        title: 'roomTitle',
        location: 'roomLocation',
        description: 'roomDescription',
        image: 'roomIMG',
        price: 'price',
        guestCount: 'numberGuest',
        utilities: 'roomUtilities',
        bookingForm: 'formBooking',
        commentsList: 'commentsList',
        commentForm: 'formComment',
    };

    // Default room search parameters
    static readonly DEFAULT_SEARCH = {
        location: SearchTestData.DEFAULT_LOCATION,
        guestCount: SearchTestData.DEFAULT_GUEST_COUNT,
    };

    // Top rooms to verify
    static readonly TOP_ROOMS_TO_VERIFY = 3;

    // Room card locator
    static readonly ROOM_CARD_SELECTOR = '.ant-card';

    // URL patterns
    static readonly URL_PATTERNS = {
        roomDetail: /\/room-detail\/\d+/,
    };
}
