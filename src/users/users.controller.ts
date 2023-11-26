import { Controller, Get, Post, Delete, Body, Param, ConflictException, NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from 'src/dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUsers()
      return users
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserById(id)
      if (!user) throw new NotFoundException('User not found')

      return user
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('User not found')
      }
      throw error
    }
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(user)

      return {
        message: 'User created successfully',
        user: newUser
      }

    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists')
      }
      throw error
    }
  }
}
