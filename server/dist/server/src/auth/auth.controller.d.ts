import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: any): {
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
    register(body: any): {
        ok: boolean;
        user: {
            id: number;
            name: any;
            email: any;
            role: any;
        };
    };
}
