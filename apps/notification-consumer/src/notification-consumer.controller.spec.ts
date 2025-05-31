import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConsumerController } from './notification-consumer.controller';
import { NotificationConsumerService } from './notification-consumer.service';

describe('NotificationConsumerController', () => {
  let notificationConsumerController: NotificationConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationConsumerController],
      providers: [NotificationConsumerService],
    }).compile();

    notificationConsumerController = app.get<NotificationConsumerController>(NotificationConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
