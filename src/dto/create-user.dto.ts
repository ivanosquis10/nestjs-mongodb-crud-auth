import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsEmail, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsOptional()
  role: string
}
