import { Controller, Get } from '@nestjs/common';
import { DB } from '../common/in-memory.datasource';

@Controller('api/stats')
export class StatsController {
  @Get()
  getStats(){
    const users = DB.users.length;
    const orders = DB.orders.length;
    const revenue = 12345; // demo
    return { users, orders, revenue };
  }
}
