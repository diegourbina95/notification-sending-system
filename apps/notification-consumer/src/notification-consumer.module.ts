import { Module } from '@nestjs/common';
import { NotificationConsumerController } from './notification-consumer.controller';
import { NotificationConsumerService } from './notification-consumer.service';

@Module({
  imports: [],
  controllers: [NotificationConsumerController],
  providers: [NotificationConsumerService],
})
export class NotificationConsumerModule {}
