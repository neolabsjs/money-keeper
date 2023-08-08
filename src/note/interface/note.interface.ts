import { ICategory } from 'src/category/interface';
import { NoteType } from '../enum';

export interface INote {
  id: string;
  title: string;
  category: ICategory;
  type: NoteType;
  amount: number;
}
