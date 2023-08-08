import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { NoteModel } from './model';
import { INote } from './interface';
import { CreateNoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(NoteModel.name) private readonly noteModel: Model<NoteModel>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(): Promise<INote[]> {
    return await this.noteModel.find().populate('category');
  }

  async create(data: CreateNoteDto): Promise<INote> {
    const { title, categoryId, type, amount } = data;
    const category = await this.categoryService.getOne(categoryId);
    const newNote = new this.noteModel({
      title: title || category.title,
      category,
      type,
      amount,
    });

    return await newNote.save();
  }
}
