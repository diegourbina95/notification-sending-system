import { Controller, Get } from '@nestjs/common';
import { NotificationConsumerService } from './notification-consumer.service';

@Controller()
export class NotificationConsumerController {
  constructor(private readonly notificationConsumerService: NotificationConsumerService) {}

  @Get()
  getHello(): string {
    return this.notificationConsumerService.getHello();
  }
}
