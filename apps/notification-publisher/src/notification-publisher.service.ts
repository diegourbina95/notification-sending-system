import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationPublisherService {
  getHello(): string {
    return 'Hello World!';
  }
}
