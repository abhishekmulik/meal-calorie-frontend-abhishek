export type User = {
    first_name:string;
    id: number;
    last_name:string;
    email:string
}

export interface AuthResponse {
    message: string;
    user: User,
    token:string
}

export interface ApiError {
    error: string,
    message: string,
    status_code: number
    retryAfter?: number
}