import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async register({ username, password, email, firstName, lastName }: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity()
    user.username = username
    user.email = email
    user.firstName = firstName
    user.lastName = lastName
    user.setPassword(password)
    return await this.userRepository.save(user)
  }

  async login({ username, password }: LoginUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({ username })
      if (user && user.verifyPassword(password)) {
        return true
      } else {
        return false
      }
    } catch (e: any) { }
  }
}
