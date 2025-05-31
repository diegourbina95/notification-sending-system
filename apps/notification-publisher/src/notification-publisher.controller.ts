import { Controller, Get } from '@nestjs/common';
import { NotificationPublisherService } from './notification-publisher.service';

@Controller()
export class NotificationPublisherController {
  constructor(private readonly notificationPublisherService: NotificationPublisherService) {}

  @Get()
  getHello(): string {
    return this.notificationPublisherService.getHello();
  }
}
