import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

import { Player } from "./player";

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  auto_id: number;

  @Prop()
  password: string;

  @Prop({ type: [{ type: SchemaMongoose.Types.ObjectId, ref: 'Player' }] })
  users_in_board: Player[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);