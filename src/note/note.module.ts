import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { ExchangeHelper } from 'src/utils';
import { NoteModel, NoteSchema } from './model';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoteModel.name, schema: NoteSchema }]),
    forwardRef(() => CategoryModule),
    AuthModule,
  ],
  controllers: [NoteController],
  providers: [NoteService, ExchangeHelper],
  exports: [NoteService],
})
export class NoteModule {}
