import { Controller, Get } from '@nestjs/common';
import { DB } from '../common/in-memory.datasource';

@Controller('api/orders')
export class OrdersController {
  @Get()
  all(){ return DB.orders; }
}
