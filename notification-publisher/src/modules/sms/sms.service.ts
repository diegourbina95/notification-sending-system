/* NESTJS IMPORTS */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

/* LIBRARY IMPORTS */
import { In, MoreThan, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';

/* MODULES IMPORTS */
import { ControllerResponse } from '../shared/interface/controller-response.interface';
import { SendCampaignDto } from './dtos/send-campaign.dto';
import { SmsEvents, SmsStatus } from './enums';
import { MessageEntity } from './entities/message.entity';
import { ConfigService } from '@nestjs/config';
import { SmsPublisherLogEntity } from './entities/sms-publisher-log.entity';
import { SendMessagesDto } from './dtos/send-messages.dto';
import { CampaignEntity } from './entities/campaign.entity';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly BATCH_SIZE = 1000;
  private readonly MAX_MESSAGE_SIZE = 160;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
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
    let idxChunk = 1;
    let lastMessageId = 0;

    const batchSize = this.configService.get<number>('batchSize');

    while (true) {
      const chunk = await this.messageRepository.find({
        select: ['processId', 'messageDetail', 'phoneNumber', 'campaignCode'],
        where: {
          campaignCode: sendCampaignDto.campaignCode,
          processStatus: SmsStatus.Pending,
          messageCode: MoreThan(lastMessageId),
        },
        order: { messageCode: 'ASC' },
        take: batchSize,
      });
      if (chunk.length === 0) break;

      this.logger.warn(
        `Enviando chunk ${idxChunk} de mensajes, cantidad: ${chunk.length}`,
      );

      await this.processSms(
        chunk,
        sendCampaignDto.messageProvider,
        sendCampaignDto.campaignCode,
      );

      lastMessageId = chunk[chunk.length - 1].messageCode;
      idxChunk++;
    }

    if (lastMessageId === 0)
      return {
        responseCode: '01',
        message: 'No se encontraron mensajes pendientes para la campaña',
      };

    return {
      responseCode: '00',
      message: 'Camapaña enviada a procesar correctamente',
    };
  }

  async sendMessages(sendMessagesDto: SendMessagesDto) {
    const failedMessages = [];
    const campaign = this.campaignRepository.create({
      campaignName: sendMessagesDto.campaignName,
      startDate: new Date(),
    });
    const responseCampaign = await this.campaignRepository.save(campaign);

    for (let i = 0; i < sendMessagesDto.messages.length; i += this.BATCH_SIZE) {
      const batch = sendMessagesDto.messages
        .slice(i, i + this.BATCH_SIZE)
        .map((item) => ({
          ...item,
          processId: uuidv4(),
          campaignCode: responseCampaign.campaignCode,
          processStatus: SmsStatus.Published,
        }));

      this.logger.warn(
        `Validating messages from ${i + 1} to ${i + this.BATCH_SIZE}`,
      );

      const newBatch = batch.filter((item) => {
        if (item.messageDetail.length <= this.MAX_MESSAGE_SIZE) {
          return item;
        } else {
          failedMessages.push({
            phoneNumber: item.phoneNumber,
            messageDetail: item.messageDetail,
            error: `Mensaje con más de ${this.MAX_MESSAGE_SIZE}`,
          });
        }
      });

      try {
        this.logger.warn(
          `Inserting messages from ${i + 1} to ${i + this.BATCH_SIZE}`,
        );

        await this.messageRepository.insert(newBatch);
        const promiseList = newBatch.map(async (message) => {
          const payload = {
            processId: message.processId,
            campaignCode: message.campaignCode,
            messageDetail: message.messageDetail,
            messageProvider: sendMessagesDto.messageProvider,
            phoneNumber: message.phoneNumber,
          };
          await this.sendSmsModel.create(payload);
          this.client.emit(SmsEvents.SendSms, payload);
        });

        await Promise.all(promiseList);
      } catch (error) {
        this.logger.error(error);
        newBatch.map((item) =>
          failedMessages.push({
            phoneNumber: item.phoneNumber,
            messageDetail: item.messageDetail,
            error: error?.message || 'Error en inserción masiva',
          }),
        );
      }
    }

    if (failedMessages.length > 0)
      return {
        responseCode: '01',
        message:
          sendMessagesDto.messages.length === failedMessages.length
            ? 'No se pudo enviar ningún mensage'
            : 'Hubo errores al enviar mensajes',
        data: {
          successfulSendNumber:
            sendMessagesDto.messages.length - failedMessages.length,
          failedSendNumber: failedMessages.length,
          failedMessages,
        },
      };

    return {
      responseCode: '00',
      message: `Se han enviado ${sendMessagesDto.messages.length} mensajes`,
      data: {
        successfulSendNumber: sendMessagesDto.messages.length,
        failedSendNumber: 0,
        failedMessages: [],
      },
    };
  }

  async processSms(
    arrayMessage: any[],
    messageProvider: string,
    campaignCode: number,
  ): Promise<void> {
    try {
      const messageCodesToUpdate = arrayMessage.map((msg) => msg.messageCode);

      await this.messageRepository.update(
        { campaignCode, messageCode: In(messageCodesToUpdate) },
        { processStatus: SmsStatus.Published },
      );

      const promiseList = arrayMessage.map(async (message) => {
        const payload = {
          processId: message.processId,
          campaignCode: message.campaignCode,
          messageCode: message.messageCode,
          messageDetail: message.messageDetail,
          messageProvider,
          phoneNumber: message.phoneNumber,
        };
        await this.sendSmsModel.create(payload);
        this.client.emit(SmsEvents.SendSms, payload);
      });

      await Promise.all(promiseList);
      this.logger.log('Todos los mensajes han sido procesados correctamente');
    } catch (error) {
      this.logger.error('Error al procesar los mensajes', error);
      throw new Error('Error al procesar los mensajes');
    }
  }
}
