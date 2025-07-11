/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */
import { SmsController } from '@src/modules/sms/sms.controller';
import { SmsService } from '@src/modules/sms/sms.service';
import {
  SmsConsumerLogEntity,
  SmsConsumerLogSchema,
} from '@src/modules/sms/entities/sms-consumer-log.entity';
import { MessageEntity } from '@src/modules/sms/entities/message.entity';
import { CampaignEntity } from './entities/campaign.entity';
import { TokenSolucionesService } from './providers/soluciones/token-soluciones.service';
import { SolucionesService } from './providers/soluciones/soluciones.service';
import { SinapsisService } from './providers/sinapsis/sinapsis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignEntity, MessageEntity]),
    MongooseModule.forFeature([
      {
        name: SmsConsumerLogEntity.name,
        schema: SmsConsumerLogSchema,
      },
    ]),
  ],
  controllers: [SmsController],
  providers: [
    SmsService,
    TokenSolucionesService,
    SolucionesService,
    SinapsisService,
  ],
})
export class SmsModule {}
