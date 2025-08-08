import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: LoginDto,
  })
  login(@Request() req: { user: UserDto }) {
    return {
      success: true,
      access_token: this.authService.login(req.user),
    };
  }

  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Signup' })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
