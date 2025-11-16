"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_datasource_1 = require("../common/in-memory.datasource");
let AuthService = class AuthService {
    login(payload) {
        const user = in_memory_datasource_1.DB.users.find(u => u.email === payload.email);
        if (!user)
            return { ok: false, message: 'Credenciales inválidas' };
        return { ok: true, user };
    }
    register(payload) {
        const id = in_memory_datasource_1.DB.users.length ? Math.max(...in_memory_datasource_1.DB.users.map(u => u.id)) + 1 : 1;
        const user = { id, name: payload.name || payload.email, email: payload.email, role: payload.role || 'user' };
        in_memory_datasource_1.DB.users.push(user);
        return { ok: true, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map