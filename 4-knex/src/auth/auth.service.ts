import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginData: CreateAuthDto) {
    const { email, password } = loginData;
    const valid = await this.validateUser(email, password);

    if (!valid) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({ sub: valid.user_id }),
    };
  }
}
