import { ICategory } from 'src/category/interface';
import { NoteType } from '../enum';
import { IUser } from 'src/user/interface';

export interface INote {
  id: string;
  title: string;
  category: ICategory;
  type: NoteType;
  amount: number;
  user: IUser;
}
