export class LoginUserDto {
  username: string
  password: string
}

export class CreateUserDto extends LoginUserDto {
  email: string
  firstName: string
  lastName: string
}