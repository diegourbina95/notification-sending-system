/* NESTJS IMPORTS */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

/* LIBRARY IMPORTS */
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';

/* MODULES IMPORTS */
import { ControllerResponse } from '../shared/interface/controller-response.interface';
import { SendCampaignDto } from './dtos/send-campaign.dto';
import { SmsEvents, SmsStatus } from './enums';
import { MessageEntity } from './entities/message.entity';
import { ConfigService } from '@nestjs/config';
import { SmsPublisherLogEntity } from './entities/sms-publisher-log.entity';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectModel(SmsPublisherLogEntity.name)
    private readonly sendSmsModel: Model<SmsPublisherLogEntity>,
    @Inject('SMS_SERVICE')
    private client: ClientProxy,
  ) {}

  async sendCampaign(
    sendCampaignDto: SendCampaignDto,
  ): Promise<ControllerResponse> {
    let offset = 0;
    let idxChunk = 1;

    const batchSize = this.configService.get<number>('batchSize');

    while (true) {
      const chunk = await this.messageRepository.find({
        select: ['messageCode', 'messageDetail', 'phoneNumber', 'campaignCode'],
        where: {
          campaignCode: sendCampaignDto.campaignCode,
          processStatus: SmsStatus.Pending,
        },
        take: batchSize,
        skip: offset,
      });

      if (chunk.length === 0) break;

      this.logger.warn(
        `Enviando chunk ${idxChunk} de mensajes, cantidad: ${chunk.length}`,
      );
      await this.processSms(chunk, sendCampaignDto.messageProvider);

      offset += batchSize;
      idxChunk++;
    }
    return {
      responseCode: '00',
      message: 'Camapaña enviada a procesar correctamente',
    };
  }

  async processSms(
    arrayMessage: any[],
    messageProvider: string,
  ): Promise<void> {
    try {
      const promiseList = arrayMessage.map(async (message) => {
        const processId = uuidv4();
        const payload = {
          processId,
          campaignCode: message.campaignCode,
          messageCode: message.messageCode,
          messageDetail: message.messageDetail,
          messageProvider,
          phoneNumber: message.phoneNumber,
        };

        this.client.emit(SmsEvents.SendSms, payload);

        await this.sendSmsModel.create(payload);
        await this.messageRepository.update(
          { messageCode: message.messageCode },
          { processStatus: SmsStatus.Published },
        );
      });

      await Promise.all(promiseList);
      this.logger.log('Todos los mensajes han sido procesados correctamente');
    } catch (error) {
      this.logger.error('Error al procesar los mensajes', error);
      throw new Error('Error al procesar los mensajes');
    }
  }
}
