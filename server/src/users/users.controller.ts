import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private svc: UsersService){}
  @Get()
  findAll(){ return this.svc.findAll(); }

  @Post()
  create(@Body() body){ return this.svc.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body){ return this.svc.update(+id, body); }

  @Delete(':id')
  remove(@Param('id') id: string){ return this.svc.remove(+id); }
}
