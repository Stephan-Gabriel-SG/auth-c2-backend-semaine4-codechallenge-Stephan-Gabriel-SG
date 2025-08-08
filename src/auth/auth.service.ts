import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const { password_hash, ...result } = user;
    const isPasswordValid = await bcrypt.compare(password, password_hash);
    if (!isPasswordValid) {
      return null;
    }
    return result;
  }

  login(user: UserDto) {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
