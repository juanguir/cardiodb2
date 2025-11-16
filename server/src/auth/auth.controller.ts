import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('login')
  login(@Body() body: any) {
    return this.auth.login(body);
  }
  @Post('register')
  register(@Body() body: any) {
    return this.auth.register(body);
  }
}
