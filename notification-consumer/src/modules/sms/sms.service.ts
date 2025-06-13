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
import { SmsConsumerLogEntity } from './entities/sms-consumer-log.entity';
import { CallSmsProviderDto } from './dtos/call-sms-provider';
import { ProviderTypes } from './types';
import { SmsStatus } from './enums';
import { SolucionesService } from './providers/soluciones/soluciones.service';
import { SinapsisService } from './providers/sinapsis/sinapsis.service';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectModel(SmsConsumerLogEntity.name)
    private readonly smsConsumerLogModel: Model<SmsConsumerLogEntity>,
    private readonly solucionesService: SolucionesService,
    private readonly sinapsisService: SinapsisService,
  ) {}

  async callSmsProvider(callSmsProviderDto: CallSmsProviderDto): Promise<void> {
    try {
      const providerResponse = await this.handleProvider(
        callSmsProviderDto.messageProvider,
        {
          processId: callSmsProviderDto.processId,
          message: callSmsProviderDto.messageDetail,
          phoneNumber: callSmsProviderDto.phoneNumber,
        },
      );
      /* const providerResponse = {
        status: 'success',
        message: 'Message sent successfully',
      }; */
      await this.smsConsumerLogModel.create({
        ...callSmsProviderDto,
        providerResponse: {
          status: 'OK',
          details: providerResponse,
        },
      });
      await this.messageRepository.update(
        { messageCode: callSmsProviderDto.messageCode },
        { processStatus: SmsStatus.Processed, sendDate: new Date() },
      );
    } catch (error) {
      this.logger.error(
        `Error in callSmsProvider: ${error.message}`,
        error.stack,
      );
      await this.smsConsumerLogModel.create({
        ...callSmsProviderDto,
        providerResponse: {
          status: 'ERROR',
          details: error?.response?.data || 'Error in callSmsProvider',
        },
      });
      await this.messageRepository.update(
        { messageCode: callSmsProviderDto.messageCode },
        { processStatus: SmsStatus.Failed },
      );
      throw error;
    }
  }

  private async handleProvider(
    provider: ProviderTypes,
    smsPayload: { processId: string; message: string; phoneNumber: string },
  ): Promise<{ status: string; message: any }> {
    switch (provider) {
      case 'SOLUCIONES':
        return await this.solucionesService.handleProvider(smsPayload);
      case 'SINAPSIS':
        return await this.sinapsisService.handleProvider(smsPayload);
      default:
        this.logger.error(`Provider ${provider} not implemented`);
        return {
          status: 'failed',
          message: `Provider ${provider} not implemented`,
        };
    }
  }
}
