import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

import { Player } from "./player";
import { User } from "./users";

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  password: string;

  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User' })
  host: User;

  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Player' }] })
  users_in_board: Player[];
}

const Boards = SchemaFactory.createForClass(Board);

Boards.post("save", function(data, next) {
  for (let i = 0; i < data.users_in_board.length; i += 1) {
    const user = data.users_in_board[i].user.toObject();
    delete user.password;
    data.users_in_board[i].user = user;
  } 
  next();
});

export const BoardSchema = Boards;