import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SmsStatus } from '../enums';

@Schema({ collection: 'send_sms' })
export class SendSmsEntity extends Document {
  @Prop({ required: true, index: true })
  processId: string;

  @Prop({ required: true })
  messageCode: number;

  @Prop(/* { required: true } */)
  messageDetail: string;

  @Prop({ required: true })
  messageProvider: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: SmsStatus.Pending })
  processStatus: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;
}

export const SendSmsSchema = SchemaFactory.createForClass(SendSmsEntity);
