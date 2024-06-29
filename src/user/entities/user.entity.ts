import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRoomDocument = UserRoom & Document;

@Schema({ timestamps: true })
export class UserRoom extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, default: false })
  password: boolean;

  @Prop({ type: Boolean, default: false })
  isSender: boolean;

  @Prop({ type: Boolean, default: false })
  isPinned: boolean;

  @Prop({ type: Date, default: Date.now })
  joinedAt: Date;

  @Prop({ type: Date, nullable: true })
  lastJoinedAt: Date;

  @Prop({ type: Date, nullable: true })
  lastLeaveAt: Date;

  @Prop({ type: Boolean, default: false })
  isJoined: boolean;
}

export const UserRoomSchema = SchemaFactory.createForClass(UserRoom);
