import { Injectable, HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';

import { UserService } from '@users/user.service';

interface Payload {
  sub: string,
  username: string,
}

interface aProps {
  user: any,
}

@Injectable()
export class AuthMiddleWare implements NestMiddleware{
  constructor(
    private readonly userService: UserService,
  ){}

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  async use(req: Request & aProps, res: Response, next: NextFunction) {
    const header = req.headers["authorization"];
    const code = header.split(" ")[1];
    const decode : Payload = jwtDecode(code);
    
    const findUser = await this.userService.findUserById(decode.sub);
    if (findUser) {
      req.user = findUser;
      next();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
