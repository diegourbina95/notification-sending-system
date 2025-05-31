import { NestFactory } from '@nestjs/core';
import { NotificationPublisherModule } from './notification-publisher.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationPublisherModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
