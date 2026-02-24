import type { UserData } from './api-helper';

/**
 * Generates test data for user registration and profile tests.
 * Uses deterministic patterns with timestamps to avoid collisions.
 */
export class TestDataGenerator {
    private static counter = 0;

    /** Generate a unique suffix based on timestamp + counter. */
    private static uniqueSuffix(): string {
        TestDataGenerator.counter++;
        return `${Date.now()}_${TestDataGenerator.counter}`;
    }

    /** Generate a valid user for registration. */
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

    /** Generate user data with a weak password. */
    static userWithWeakPassword(): UserData {
        const user = TestDataGenerator.validUser();
        user.password = '123';
        return user;
    }

    /** Generate user data for profile update (no password field). */
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

    /** Return invalid login credentials. */
    static invalidCredentials() {
        return {
            email: 'nonexistent@fake.com',
            password: 'WrongPassword!999',
        };
    }
}
