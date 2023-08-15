import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './shared/services/prisma.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  if (process.env.DB_connect) {
    process.env.DATABASE_URL = process.env.DB_connect;
  } else {
    process.env.DATABASE_URL =
      'mysql://root:9aa80452@localhost:3306/greatshirtdb';
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(8000);
}
bootstrap();
