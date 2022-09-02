import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateUserDto } from "./user.dto";
import * as crypto from 'crypto';

@Entity({name: 'user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    nullable: false
  })
  username: string

  @Column()
  email: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  password: string

  @Column()
  passwordAlg: string

  @Column()
  passwordSalt: string

  setPassword(password: string): void {
    this.passwordSalt = crypto.randomBytes(16).toString('hex')
    this.passwordAlg = 'sha256'
    this.password = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, this.passwordAlg).toString('hex')
  }

  verifyPassword(password: string): boolean {
    return this.password === crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, this.passwordAlg).toString('hex')
  }
}