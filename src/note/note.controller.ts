import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { INote } from './interface';
import { CreateNoteDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  async getAll(): Promise<INote[]> {
    return await this.service.getAll();
  }

  @Post()
  async create(@Body() data: CreateNoteDto): Promise<INote> {
    return await this.service.create(data);
  }
}
