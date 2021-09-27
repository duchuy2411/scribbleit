import { Controller, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '../mongo/schema/users';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Get()
  findUserById(@Body() body): any {
    const user = new User();
    user.username = body.username;
    return this.userService.findUserById(body.username);
  }
}
