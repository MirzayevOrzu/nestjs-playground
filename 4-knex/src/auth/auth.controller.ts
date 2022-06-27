import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginData: CreateAuthDto) {
    return this.authService.login(loginData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  example(@CurrentUser() user) {
    return user;
  }
}
