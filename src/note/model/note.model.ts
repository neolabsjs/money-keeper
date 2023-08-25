import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoryModel } from 'src/category/model';
import { UserModel } from 'src/user/model';
import { INote } from '../interface';
import { NoteType } from '../enum';

@Schema()
export class NoteModel implements INote {
  @Prop({ alias: '_id' })
  id: string;

  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel' })
  category: CategoryModel;

  @Prop()
  type: NoteType;

  @Prop()
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  user: UserModel;
}

export const NoteSchema = SchemaFactory.createForClass(NoteModel);
