import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interface';

export class CategoryDto implements ICategory {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Food' })
  title: string;
}
