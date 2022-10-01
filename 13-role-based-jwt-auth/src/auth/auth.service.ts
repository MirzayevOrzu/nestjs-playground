import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Injectable()
export class AuthService {
  users = [
    {
      id: 1,
      username: 'usmon',
      password: '12345',
      role: Role.ADMIN,
    },
    {
      id: 2,
      username: 'ahmad',
      password: '12345',
      role: Role.USER,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    if (!username || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      user: { id: user.id, role: user.role },
    });

    return { token };
  }
}
