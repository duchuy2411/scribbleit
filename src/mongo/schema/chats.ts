import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Board } from "./boards";
import { User } from "./users";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  id_board: Board;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];

  @Prop()
  message: string;

  @Prop({ default: new Date() })
  time: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);