/* NESTJS IMPORTS */
import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SmsService } from '@src/modules/sms/sms.service';
import { SmsEvents } from './enums';
import { CallSmsProviderDto } from './dtos/call-sms-provider';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Controller()
export class SmsController {
  private readonly logger = new Logger(SmsController.name);
  constructor(private readonly smsService: SmsService) {}

  @EventPattern(SmsEvents.SendSms)
  async callSmsProvider(callSmsProviderDto: CallSmsProviderDto) {
    try {
      await this.smsService.callSmsProvider(callSmsProviderDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
