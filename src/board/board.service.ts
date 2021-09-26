import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Board, BoardDocument } from '@mongo/schema/boards';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private userModel: Model<BoardDocument>) {}

  findBoardById() {

  }
}
