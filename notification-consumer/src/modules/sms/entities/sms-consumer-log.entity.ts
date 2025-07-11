import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'sms_consumer_log' })
export class SmsConsumerLogEntity extends Document {
  @Prop({ required: true, index: true })
  processId: string;

  @Prop({ required: true })
  campaignCode: number;

  @Prop({ required: true })
  messageDetail: string;

  @Prop({ required: true })
  messageProvider: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  providerResponse: any;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const SmsConsumerLogSchema =
  SchemaFactory.createForClass(SmsConsumerLogEntity);
