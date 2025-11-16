"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_datasource_1 = require("../common/in-memory.datasource");
let UsersService = class UsersService {
    findAll() { return in_memory_datasource_1.DB.users; }
    create(payload) {
        const id = in_memory_datasource_1.DB.users.length ? Math.max(...in_memory_datasource_1.DB.users.map(u => u.id)) + 1 : 1;
        const user = { id, name: payload.name, email: payload.email, role: payload.role || 'user' };
        in_memory_datasource_1.DB.users.push(user);
        return user;
    }
    update(id, payload) {
        const u = in_memory_datasource_1.DB.users.find(x => x.id === id);
        if (!u)
            return { error: 'not found' };
        u.name = payload.name ?? u.name;
        u.email = payload.email ?? u.email;
        u.role = payload.role ?? u.role;
        return u;
    }
    remove(id) {
        const idx = in_memory_datasource_1.DB.users.findIndex(x => x.id === id);
        if (idx === -1)
            return { error: 'not found' };
        in_memory_datasource_1.DB.users.splice(idx, 1);
        return { ok: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map