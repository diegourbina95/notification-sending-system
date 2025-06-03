import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '@src/modules/sms/entities/message.entity';
import { SmsStatus } from '@src/modules/sms/enums';
import { Repository } from 'typeorm';
import { PopulateByCampaignDto } from './dtos/populate-by-campaign.dto';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async populateByCampaign(
    populateByCampaignDto: PopulateByCampaignDto,
  ): Promise<any> {
    const batchSize = 1000;
    const messages = Array.from(
      { length: populateByCampaignDto.size },
      (_, index) => ({
        messageDetail: `Message detail ${index}`,
        phoneNumber: populateByCampaignDto.phoneNumber,
        campaignCode: populateByCampaignDto.campaignCode,
        processStatus: SmsStatus.Pending,
      }),
    );

    for (let i = 0; i < messages.length; i += batchSize) {
      this.logger.warn(`Inserting messages from ${i} to ${i + batchSize}`);
      const batch = messages.slice(i, i + batchSize);
      await this.messageRepository.insert(batch);
    }

    return {
      message: `Se han enviado ${populateByCampaignDto.size} mensajes`,
      statusCode: 200,
    };
  }
}
