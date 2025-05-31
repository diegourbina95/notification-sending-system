import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
