import { Controller, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '../mongo/schema/users';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUserById(@Body() body): any {
    const user = new User();
    user.username = body.username;
    return this.userService.findUserById(body.username);
  }
}
