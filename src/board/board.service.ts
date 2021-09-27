import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Board, BoardDocument } from '@mongo/schema/boards';
import { Player, PlayerDocument } from '@mongo/schema/player';
import { User, UserDocument } from '@mongo/schema/users';

interface objectId {
  _id: String
}
@Injectable()
export class BoardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async getAll() {
    return await this.boardModel.find({});
  }

  async findBoardById(id: String) {
    const board = await this.boardModel.findOne({ _id: id }).populate({
      path: 'users_in_board',
      select: 'score name',
      populate: {
        path: 'user',
        select: 'username'
    }});
    if (board) return board;
    return null;
  }

  async createBoard(board: Board, host: User & objectId) {
    const createHost = new Player();
    createHost.user = host;
    createHost.name = host.name_in_game;
    createHost.score = 0;
    const newHost = await this.playerModel.create(createHost);
    board.users_in_board.push(newHost);
    const newBoard = await this.boardModel.create(board);
    if (!newBoard) return null;
    return newBoard;
  }

  async updateBoard(data: any, idBoard: string) {
    const board = await this.boardModel.findOneAndUpdate({ _id: idBoard }, { ...data }, { new: true });
    return board;
  }

  async addPlayer(data: any, idBoard: string) {
    const player = new Player();
    if (data.name) player.name = data.name;
    const findUser = await this.userModel.findOne({ _id: data.user });
    player.user = findUser;
    player.score = 0;
    const savePlayer = await this.playerModel.create(player);
    const board = await this.findBoardById(idBoard);
    board.users_in_board.push(savePlayer);
    const saveBoard = await this.updateBoard({ users_in_board: board.users_in_board }, idBoard);
    return saveBoard;
  }
}
