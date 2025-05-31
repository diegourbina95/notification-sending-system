import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  console.log(`Notification Publisher is running on port ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
