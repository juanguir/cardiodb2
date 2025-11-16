import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { StatsController } from './stats/stats.controller';
import { OrdersController } from './orders/orders.controller';
import { ChartController } from './chart/chart.controller';

@Module({
   imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../', 'client'),
     exclude: ['/api'],
       serveStaticOptions: {
        fallthrough: true,
      },  
    }),  
  ],
  controllers: [AuthController, UsersController, StatsController, OrdersController, ChartController],
  providers: [AuthService, UsersService],
})
export class AppModule {}
