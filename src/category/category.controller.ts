import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ICategory } from './interface';
import { CreateCategoryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async getAll(): Promise<ICategory[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<ICategory> {
    return await this.service.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<ICategory> {
    return await this.service.create(data);
  }
}
