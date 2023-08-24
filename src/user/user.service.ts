import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './interface';
import { UserModel } from './model';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User in not defined');
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email });
  }

  async create(data: CreateUserDto): Promise<IUser> {
    const { name, email, password, passwordRepeat } = data;

    const exist = await this.userModel.findOne({ email });
    if (exist) {
      throw new ConflictException('This email is already exists');
    }

    if (password != passwordRepeat) {
      throw new BadRequestException('Passowrds does not match');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return await newUser.save();
  }
}
