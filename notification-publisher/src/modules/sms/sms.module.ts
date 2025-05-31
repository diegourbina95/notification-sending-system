/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */
import { SmsController } from '@src/modules/sms/sms.controller';
import { SmsService } from '@src/modules/sms/sms.service';
import {
  SendSmsEntity,
  SendSmsSchema,
} from '@src/modules/sms/entities/send-sms.entity';
import { MessageEntity } from '@src/modules/sms/entities/message.entity';
import { CamapaignEntity } from './entities/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CamapaignEntity, MessageEntity]),
    MongooseModule.forFeature([
      {
        name: SendSmsEntity.name,
        schema: SendSmsSchema,
      },
    ]),
  ],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
