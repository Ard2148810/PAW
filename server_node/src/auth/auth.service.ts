import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SignupResponseDto } from './dto/signup-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const valid = await this.validatePassword(user, pass);
      if (valid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async validatePassword(user, password) {
    return await compare(password, user.password);
  }

  async login(user: any): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.userId };
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }
}
