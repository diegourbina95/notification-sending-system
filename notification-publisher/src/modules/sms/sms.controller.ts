/* NESTJS IMPORTS */
import { Controller, Get } from '@nestjs/common';
import { SmsService } from '@src/modules/sms/sms.service';
/* import { ControllerResponse } from '@src/modules/shared/interface/controller-response.interface'; */

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Controller({
  path: 'sms',
  version: '1', // estructura del path: /v1/keynua/
})
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Get('test')
  async testController(): Promise<any> {
    try {
      return await this.smsService.test();
    } catch (error) {
      return {
        responseCode: '99',
        message: 'Error Interno',
      };
    }
  }
}
