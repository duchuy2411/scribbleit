import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaMongoose, Document } from 'mongoose';

import { User } from "./users";

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  name: string;

  @Prop()
  score: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);