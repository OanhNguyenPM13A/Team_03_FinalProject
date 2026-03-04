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
