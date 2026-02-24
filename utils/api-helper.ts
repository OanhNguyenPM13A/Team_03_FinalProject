import { APIRequestContext, request } from '@playwright/test';
import { API_BASE_URL, API_ENDPOINTS, TOKEN_CYBERSOFT } from '../constants';

export interface UserData {
    id?: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    birthday: string;
    gender: boolean;
    role?: string;
}

export interface LoginResponse {
    statusCode: number;
    content: {
        user: UserData & { id: number };
        token: string;
    };
    message: string;
}

/**
 * Helper class for direct API calls — used for test data setup/teardown.
 */
export class ApiHelper {
    private apiContext!: APIRequestContext;
    private token: string = '';

    async init(): Promise<void> {
        this.apiContext = await request.newContext({
            baseURL: API_BASE_URL,
            extraHTTPHeaders: {
                tokenCybersoft: TOKEN_CYBERSOFT,
            },
        });
    }

    async dispose(): Promise<void> {
        await this.apiContext?.dispose();
    }

    /** Sign in and store JWT token for subsequent calls. */
    async signIn(email: string, password: string): Promise<LoginResponse> {
        const response = await this.apiContext.post(API_ENDPOINTS.SIGN_IN, {
            data: { email, password },
        });
        const body = await response.json();
        if (body?.content?.token) {
            this.token = body.content.token;
        }
        return body;
    }

    /** Register a new user. */
    async signUp(user: UserData): Promise<any> {
        const response = await this.apiContext.post(API_ENDPOINTS.SIGN_UP, {
            data: user,
        });
        return response.json();
    }

    /** Get user by ID. */
    async getUserById(id: number): Promise<any> {
        const response = await this.apiContext.get(API_ENDPOINTS.USER_BY_ID(id));
        return response.json();
    }

    /** Update user info (no password change via this endpoint). */
    async updateUser(id: number, data: Partial<UserData>): Promise<any> {
        const response = await this.apiContext.put(API_ENDPOINTS.USER_BY_ID(id), {
            headers: { token: this.token },
            data: { id, ...data },
        });
        return response.json();
    }

    /** Delete a user by ID. */
    async deleteUser(id: number): Promise<any> {
        const response = await this.apiContext.delete(API_ENDPOINTS.USERS, {
            params: { id },
        });
        return response.json();
    }

    /** Upload avatar for the logged-in user. */
    async uploadAvatar(filePath: string): Promise<any> {
        const response = await this.apiContext.post(API_ENDPOINTS.UPLOAD_AVATAR, {
            headers: { token: this.token },
            multipart: {
                formFile: {
                    name: 'avatar.png',
                    mimeType: 'image/png',
                    buffer: require('fs').readFileSync(filePath),
                },
            },
        });
        return response.json();
    }

    getToken(): string {
        return this.token;
    }
}
