import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/* import { MicroserviceOptions, Transport } from '@nestjs/microservices'; */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  }); */

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Publisher API')
    .setDescription('API for publishing notifications')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
