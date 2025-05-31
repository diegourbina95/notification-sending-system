import { Test, TestingModule } from '@nestjs/testing';
import { NotificationPublisherController } from './notification-publisher.controller';
import { NotificationPublisherService } from './notification-publisher.service';

describe('NotificationPublisherController', () => {
  let notificationPublisherController: NotificationPublisherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationPublisherController],
      providers: [NotificationPublisherService],
    }).compile();

    notificationPublisherController = app.get<NotificationPublisherController>(NotificationPublisherController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificationPublisherController.getHello()).toBe('Hello World!');
    });
  });
});
