import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'
import { RolesGuard } from './guard/roles.guard'
import { roles } from './types/roles.types'
import { Roles } from './decorators/role.decorator'
import { Auth } from './decorators/auth.decorators'

interface RequestWithUser extends Request {
  user: { email: string; role: string, username: string, name: string }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Creamos la ruta post para registrar al usuario
  @Post('register')
  register(@Body() user: CreateUserDto) {
    // user.admin = false
    return this.authService.register(user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user)
  }


  // Sin composicion de decoradores
  @Get('profile')
  @Roles(roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Request() req: RequestWithUser) {
    console.log('ejecutao despues', req.user)
    return req.user
  }

  // Con composicion de decoradores
  @Get('profile2')
  @Auth(roles.ADMIN)
  profile2(@Request() req: RequestWithUser) {
    console.log('ejecutao despues', req.user)
    return req.user
  }
}
