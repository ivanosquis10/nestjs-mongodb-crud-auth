import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from "bcryptjs"

import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async register({ email, name, password, username, role }: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(email)

    if (user) throw new BadRequestException('User already exists')

    const hashedPassowrd = await bcryptjs.hash(password, 10)

    await this.usersService.create({
      email,
      name,
      password: hashedPassowrd,
      username,
      role
    })

    return {
      message: "User created successfully"
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.getUserByEmail(email)

    if (!user) throw new UnauthorizedException('Invalid email')

    const isValidPassowrd = await bcryptjs.compare(password, user.password)

    if (!isValidPassowrd) throw new UnauthorizedException('Invalid password')

    const payload = { email: user.email, username: user.username, name: user.name, role: user.role }

    const token = await this.jwtService.signAsync(payload)
    return {
      email: user.email,
      token
    }
  }
}
