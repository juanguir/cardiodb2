export declare class AuthService {
    login(payload: {
        email: string;
        password: string;
    }): {
        ok: boolean;
        message: string;
        user?: undefined;
    } | {
        ok: boolean;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
        message?: undefined;
    };
    register(payload: any): {
        ok: boolean;
        user: {
            id: number;
            name: any;
            email: any;
            role: any;
        };
    };
}
