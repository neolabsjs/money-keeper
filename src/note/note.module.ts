import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModel, NoteSchema } from './model';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoteModel.name, schema: NoteSchema }]),
    CategoryModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
