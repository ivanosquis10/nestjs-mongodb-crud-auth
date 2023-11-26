import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Creamos la ruta post para registrar al usuario
  @Post('register')
  register(@Body() user: CreateUserDto) {
    // user.admin = false
    return this.authService.register(user)
  }

  /*  
    El decorador @HttpCode(HttpStatus.OK) es una característica de Nest.js que te permite establecer explícitamente el código de estado HTTP que se enviará como respuesta para una ruta específica de un controlador. 
    En este caso particular, el decorador está configurado para devolver un código de estado HTTP 200 (OK) cuando se realiza una solicitud POST a la ruta /login.
  */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user)
  }


  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user
  }
}
