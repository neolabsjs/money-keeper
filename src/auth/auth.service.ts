import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !isMatch) {
      throw new BadRequestException('Email or password does not match');
    }

    const payload = {
      sub: user.id,
      iat: Date.now(),
      exp: Date.now() + 8 * 60 * 60 * 1000,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }
}
