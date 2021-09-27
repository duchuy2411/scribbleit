import { Injectable, HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';

import { UserService } from '@users/user.service';
import { BoardService } from '@/board/board.service';

interface boardProps {
  user: any,
  board: any,
}

@Injectable()
export class RoleMiddleware implements NestMiddleware{
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ){}

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  async use(req: Request & boardProps, res: Response, next: NextFunction) {
    const id = req.params.idBoard;
    if (id === "all") next();
    const findBoard = await this.boardService.findBoardById(id);
    if (!findBoard) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    if (!req.user._id.equals(findBoard.host)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    next();
  }
}
