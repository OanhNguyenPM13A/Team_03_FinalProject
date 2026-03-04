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
