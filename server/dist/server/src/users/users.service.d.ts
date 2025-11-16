export declare class UsersService {
    findAll(): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    create(payload: any): {
        id: number;
        name: any;
        email: any;
        role: any;
    };
    update(id: number, payload: any): {
        id: number;
        name: string;
        email: string;
        role: string;
    } | {
        error: string;
    };
    remove(id: number): {
        error: string;
        ok?: undefined;
    } | {
        ok: boolean;
        error?: undefined;
    };
}
