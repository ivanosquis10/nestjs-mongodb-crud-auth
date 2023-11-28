import { type Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { CreateUserDto } from 'src/dto/create-user.dto'
import { hashPassword } from 'src/libs/hashing'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async getAllUsers() {
    return await this.userModel.find()
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id)
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async create(user: CreateUserDto) {
    const newUser = new this.userModel(user)
    await newUser.save()
    return newUser
  }
}
