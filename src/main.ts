import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe()) // activamos la validación global
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000)
}
bootstrap()
