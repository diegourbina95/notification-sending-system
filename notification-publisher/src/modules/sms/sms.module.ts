/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */
import { SmsController } from '@src/modules/sms/sms.controller';
import { SmsService } from '@src/modules/sms/sms.service';
import {
  SmsPublisherLogEntity,
  SmsPublisherLogSchema,
} from '@src/modules/sms/entities/sms-publisher-log.entity';
import { MessageEntity } from '@src/modules/sms/entities/message.entity';
import { CampaignEntity } from './entities/campaign.entity';
import { RabbitMQType } from '@src/libs/config/types.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SMS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<RabbitMQType>('rabbitMQ').uri],
            queue: configService.get<RabbitMQType>('rabbitMQ').queue,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([CampaignEntity, MessageEntity]),
    MongooseModule.forFeature([
      {
        name: SmsPublisherLogEntity.name,
        schema: SmsPublisherLogSchema,
      },
    ]),
  ],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
