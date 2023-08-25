import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard';
import { NoteService } from './note.service';
import { INote } from './interface';
import { CreateNoteDto } from './dto';
import { CurrentUser } from 'src/auth/decorator';
import { IUser } from 'src/user/interface';

@ApiTags('Note')
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @Get()
  async getAll(@CurrentUser() user: IUser): Promise<INote[]> {
    return await this.service.getAll(user);
  }

  @Post()
  async create(
    @Body() data: CreateNoteDto,
    @CurrentUser() user: IUser,
  ): Promise<INote> {
    return await this.service.create(data, user);
  }
}
