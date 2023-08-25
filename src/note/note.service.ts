import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExchangeHelper, Currencies } from 'src/utils';
import { CategoryService } from 'src/category/category.service';
import { NoteModel } from './model';
import { INote } from './interface';
import { CreateNoteDto } from './dto';
import { IUser } from 'src/user/interface';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(NoteModel.name) private readonly noteModel: Model<NoteModel>,
    // dependency injection:
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    private readonly exchangeHelper: ExchangeHelper,
  ) {}

  async getAll(user: IUser): Promise<INote[]> {
    return await this.noteModel.find({ user }).populate('category');
  }

  async create(data: CreateNoteDto, user: IUser): Promise<INote> {
    const { title, categoryId, type, amount, currency } = data;
    const category = await this.categoryService.getOne(categoryId);

    const amountKgs =
      currency != Currencies.KGS
        ? await this.exchangeHelper.exchange(amount, currency)
        : amount;

    const newNote = new this.noteModel({
      title: title || category.title,
      category,
      type,
      amount: amountKgs,
      user,
    });

    return await newNote.save();
  }
}
