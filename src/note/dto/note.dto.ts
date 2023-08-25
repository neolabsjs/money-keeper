import { ApiProperty } from '@nestjs/swagger';
import { INote } from '../interface';
import { NoteType } from '../enum';
import { ICategory } from 'src/category/interface';
import { IUser } from 'src/user/interface';

export class NoteDto implements INote {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Bought KFC' })
  title: string;

  @ApiProperty()
  category: ICategory;

  @ApiProperty({ example: NoteType.EXPENSE, enum: NoteType })
  type: NoteType;

  @ApiProperty({ example: 500 })
  amount: number;

  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  user: IUser;
}
