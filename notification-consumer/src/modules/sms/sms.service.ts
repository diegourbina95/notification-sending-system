/* NESTJS IMPORTS */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

/* LIBRARY IMPORTS */
import { Repository } from 'typeorm';
import { Model } from 'mongoose';

/* MODULES IMPORTS */
import { MessageEntity } from './entities/message.entity';
import { ConfigService } from '@nestjs/config';
import { SmsConsumerLogEntity } from './entities/sms-consumer-log.entity';
import { CallSmsProviderDto } from './dtos/call-sms-provider';
import { ProviderTypes } from './types';
import { SmsStatus } from './enums';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectModel(SmsConsumerLogEntity.name)
    private readonly smsConsumerLogModel: Model<SmsConsumerLogEntity>,
  ) {}

  async callSmsProvider(callSmsProviderDto: CallSmsProviderDto): Promise<void> {
    try {
      const providerResponse = await this.handleProvider(
        callSmsProviderDto.messageProvider,
        {
          message: callSmsProviderDto.messageDetail,
          phoneNumber: callSmsProviderDto.phoneNumber,
        },
      );
      await this.smsConsumerLogModel.create({
        ...callSmsProviderDto,
        providerResponse,
      });
      await this.messageRepository.update(
        { messageCode: callSmsProviderDto.messageCode },
        { processStatus: SmsStatus.Processed },
      );
    } catch (error) {
      this.logger.error(
        `Error in callSmsProvider: ${error.message}`,
        error.stack,
      );
      await this.smsConsumerLogModel.create({
        callSmsProviderDto,
        providerResponse: error.message,
      });
      await this.messageRepository.update(
        { messageCode: callSmsProviderDto.messageCode },
        { processStatus: SmsStatus.Failed },
      );
      throw error;
    }
  }

  async handleProvider(
    provider: ProviderTypes,
    smsPayload: { message: string; phoneNumber: string },
  ): Promise<any> {
    switch (provider) {
      case 'SMS_SOLUCIONES':
        this.logger.log('phoneNumber: ', smsPayload.phoneNumber);
        this.logger.log('message: ', smsPayload.message);
        return 'Handling SMS_SOLUCIONES provider';
      default:
        this.logger.error(`Provider ${provider} not implemented`);
        throw new Error(`Provider ${provider} not implemented`);
    }
  }
}
