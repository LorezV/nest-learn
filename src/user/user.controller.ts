import { Controller, Get, Body, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('auth/register')
  async register(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.userService.register(dto)
  }

  @Post('auth/login')
  async login(@Body() dto: LoginUserDto): Promise<any> {
    return this.userService.login(dto)
  }
}
