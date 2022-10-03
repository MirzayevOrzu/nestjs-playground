import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Injectable()
export class AuthService {
  users: User[] = [
    {
      id: 1,
      isAdmin: true,
    },
    {
      id: 2,
      isAdmin: false,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  login(id: number) {
    if (!id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      user: { id: user.id, isAdmin: user.isAdmin },
    });

    return { token };
  }
}
