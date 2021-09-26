import { Controller, Get, Body, Request } from '@nestjs/common';
import { BoardService } from './board.service';

import { Board } from '@mongo/schema/boards';

@Controller('boards')
export class BoardController {
  constructor(private readonly userService: BoardService) {}

  @Get(':id')
  findBoardById(@Body() body, @Request() req): any {
    console.log(req.user);
    return 'board ne';
  }
}
