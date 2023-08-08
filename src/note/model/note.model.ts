import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { INote } from '../interface';
import { NoteType } from '../enum';
import { CategoryModel } from 'src/category/model';

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
}

export const NoteSchema = SchemaFactory.createForClass(NoteModel);
