import { UsersService } from './users.service';
export declare class UsersController {
    private svc;
    constructor(svc: UsersService);
    findAll(): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    create(body: any): {
        id: number;
        name: any;
        email: any;
        role: any;
    };
    update(id: string, body: any): {
        id: number;
        name: string;
        email: string;
        role: string;
    } | {
        error: string;
    };
    remove(id: string): {
        error: string;
        ok?: undefined;
    } | {
        ok: boolean;
        error?: undefined;
    };
}
