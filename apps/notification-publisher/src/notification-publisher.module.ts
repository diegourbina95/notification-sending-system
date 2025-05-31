import { Module } from '@nestjs/common';
import { NotificationPublisherController } from './notification-publisher.controller';
import { NotificationPublisherService } from './notification-publisher.service';

@Module({
  imports: [],
  controllers: [NotificationPublisherController],
  providers: [NotificationPublisherService],
})
export class NotificationPublisherModule {}
