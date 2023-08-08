import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './interface';
import { CreateCategoryDto } from './dto';
import { CategoryModel } from './model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel.name)
    private readonly categoryModel: Model<CategoryModel>,
  ) {}

  async getAll(): Promise<ICategory[]> {
    return await this.categoryModel.find();
  }

  async getOne(id: string): Promise<ICategory> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(data: CreateCategoryDto): Promise<ICategory> {
    const { title } = data;

    const exist = await this.categoryModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such category already exists');
    }

    const newCategory = new this.categoryModel({ title });
    return await newCategory.save();
  }
}
