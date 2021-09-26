import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { User } from '@mongo/schema/users';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async gett(){
    return 'Hello';
  }

  @Post('login')
  async login(@Body() body): Promise<any> {
    const user = new User();
    user.username = body.username;
    user.password = body.password;
    const getUser = await this.userService.validateUser(user);
    if (getUser) {
      const payload = { username: user.username, sub: getUser._id };
      return { access_token: this.jwtService.sign(payload) };
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  }

  @Post('register')
  async register(@Body() body): Promise<any> {
    const { username, password, name_in_game } = body;
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.name_in_game = name_in_game;

    return this.userService.register(newUser);
  }
}
