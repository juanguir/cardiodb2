import { Injectable } from '@nestjs/common';
import { DB } from '../common/in-memory.datasource';

@Injectable()
export class AuthService {
  login(payload: {email:string, password: string}) {
    const user = DB.users.find(u => u.email === payload.email);
    if (!user) return { ok: false, message: 'Credenciales inválidas' };
    // demo: no password check
    return { ok: true, user };
  }
  register(payload: any) {
    const id = DB.users.length ? Math.max(...DB.users.map(u => u.id)) + 1 : 1;
    const user = { id, name: payload.name || payload.email, email: payload.email, role: payload.role || 'user' };
    DB.users.push(user);
    return { ok: true, user };
  }
}
