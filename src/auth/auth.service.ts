import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    console.log('validateUser:', { email }, { password });
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const { password_hash, ...result } = user;
    console.log({ password_hash });
    const isPasswordValid = await bcrypt.compare(password, password_hash);
    if (!isPasswordValid) {
      return null;
    }
    return result;
  }
}
