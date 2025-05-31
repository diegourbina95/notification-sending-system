/* NESTJS IMPORTS */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Injectable()
export class SmsService {
  private readonly environment: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {
    this.environment = this.configService.get('environment');
  }

  async test() {
    const message = await this.messageRepository.find();
    return {
      message: 'SMS Service is working',
      data: message,
    };
  }
}
