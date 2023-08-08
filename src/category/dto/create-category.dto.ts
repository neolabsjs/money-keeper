import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food' })
  @Length(3, 250)
  @IsString()
  title: string;
}
