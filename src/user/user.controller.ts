import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<IUser> {
    return await this.userService.create(data);
  }
}
