import { Injectable } from '@nestjs/common';
import { DB } from '../common/in-memory.datasource';

@Injectable()
export class UsersService {
  findAll(){ return DB.users; }
  create(payload:any){
    const id = DB.users.length ? Math.max(...DB.users.map(u=>u.id)) +1 : 1;
    const user = { id, name: payload.name, email: payload.email, role: payload.role || 'user' };
    DB.users.push(user);
    return user;
  }
  update(id:number, payload:any){
    const u = DB.users.find(x=>x.id===id);
    if(!u) return {error:'not found'};
    u.name = payload.name ?? u.name;
    u.email = payload.email ?? u.email;
    u.role = payload.role ?? u.role;
    return u;
  }
  remove(id:number){
    const idx = DB.users.findIndex(x=>x.id===id);
    if(idx===-1) return {error:'not found'};
    DB.users.splice(idx,1);
    return {ok:true};
  }
}
