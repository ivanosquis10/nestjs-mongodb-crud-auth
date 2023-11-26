import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants/jwt.constants'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],
  // imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersModule }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
