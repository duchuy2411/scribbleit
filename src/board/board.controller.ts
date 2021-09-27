import { Controller, Get, Body, Request, Param, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';

import { Board } from '@mongo/schema/boards';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('getAll')
  async getAll() {
    return this.boardService.getAll();
  }

  @Get('boardId/:idBoard')
  async findBoardById(@Body() body, @Request() req, @Param() param): Promise<any> {
    const id = param.idBoard;
    const board = await this.boardService.findBoardById(id);
    if (!board) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return board;
  }

  @Post()
  async createBoard(@Body() body, @Request() req): Promise<any> {
    try {
      const board = new Board();
      if (body.password) board.password = body.password;
      board.host = req.user._id;
      board.users_in_board = [];
      const newBoard = await this.boardService.createBoard(board, req.user);
      if (!newBoard) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return newBoard;
    } catch (error) {
      console.log("Error:", error.stack);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('boardId/:idBoard')
  async updateBoard(@Body() body, @Param() param): Promise<any> {
    try {
      const id = param.id;
      if (id) {
        const data = { password: body.password };
        const update = await this.boardService.updateBoard(data, id);
        if (!update) throw new HttpException('Bad request', HttpStatus.NOT_FOUND);
        return update;
      }
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log("Error:", error.stack);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('boardId/:idBoard/player')
  async addPlayer(@Body() body, @Param() param) {
    try {
      const idBoard = param.idBoard;
      if (idBoard) {
        const data = { user: body.user, name: body.name };
        const update = await this.boardService.addPlayer(data, idBoard);
        if (!update) throw new HttpException('Bad request', HttpStatus.NOT_FOUND);
        return update;
      }
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log("Error:", error.stack);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
