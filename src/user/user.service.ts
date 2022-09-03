import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { IUserResponse } from "./types/user-response.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne({
      where: [{ email: createUserDto.username }, { username: createUserDto.username }]
    })

    if (candidate) throw new HttpException('User already exist', HttpStatus.UNPROCESSABLE_ENTITY)

    const newUser = new UserEntity()
    Object.assign(newUser, createUserDto)
    return await this.userRepository.save(newUser)
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email }, select: ['id', 'username', 'email', 'bio', 'image', 'password'] })

    if (!user) throw new HttpException(
      'Credentials are not found',
      HttpStatus.UNPROCESSABLE_ENTITY
    )

    const isPasswordCorrent = await compare(loginUserDto.password, user.password)
    if (!isPasswordCorrent) throw new HttpException(
      'Credentials are not found',
      HttpStatus.UNPROCESSABLE_ENTITY
    )

    delete user.password

    return user
  }

  generateJwt(user: UserEntity) {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      SECRET_KEY
    )
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}