import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sms_publisher_log' })
export class SmsPublisherLogEntity extends Document {
  @Prop({ required: true, index: true })
  processId: string;

  @Prop({ required: true })
  campaignCode: number;

  @Prop({ required: true })
  messageCode: number;

  @Prop({ required: true })
  messageDetail: string;

  @Prop({ required: true })
  messageProvider: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const SmsPublisherLogSchema = SchemaFactory.createForClass(
  SmsPublisherLogEntity,
);
