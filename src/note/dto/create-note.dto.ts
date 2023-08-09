import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, Length, Matches } from 'class-validator';
import { Currencies } from 'src/utils';
import { NoteType } from '../enum';

export class CreateNoteDto {
  @ApiProperty({ example: 'Bought KFC' })
  @Length(0, 250)
  title: string;

  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  @Length(24, 24)
  @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/, {
    message: 'Invalid ID',
  })
  categoryId: string;

  @ApiProperty({ example: NoteType.EXPENSE, enum: NoteType })
  @IsEnum(NoteType)
  type: NoteType;

  @ApiProperty({ example: 500 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  amount: number;

  @ApiProperty({ example: Currencies.KGS, enum: Currencies })
  @IsEnum(Currencies)
  currency: Currencies;
}
