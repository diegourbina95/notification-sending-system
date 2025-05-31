import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'send_sms' })
export class SendSmsEntity extends Document {
  @Prop({ required: true })
  phoneNumber: string;

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
