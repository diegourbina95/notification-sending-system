/* NESTJS IMPORTS */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { ClientProxy } from '@nestjs/microservices';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Injectable()
export class SmsService {
  private readonly environment: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @Inject('SMS_SERVICE')
    private client: ClientProxy,
  ) {
    this.environment = this.configService.get('environment');
  }

  async test() {
    /*  const message = await this.messageRepository.find(); */
    this.client.emit('sms_test_event', {
      message: 'Test SMS message',
    });
    return {
      message: 'SMS Service is working',
    };
  }
}
