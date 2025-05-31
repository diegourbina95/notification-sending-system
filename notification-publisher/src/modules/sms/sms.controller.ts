/* NESTJS IMPORTS */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SmsService } from '@src/modules/sms/sms.service';
import {
  SendCampaignDto,
  SendCampaignResponseDto,
} from './dtos/send-campaign.dto';
/* import { ControllerResponse } from '@src/modules/shared/interface/controller-response.interface'; */

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Controller({
  path: 'sms',
  version: '1',
})
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @ApiOperation({ summary: 'API para enviar mensajes por campaña' })
  @ApiOkResponse({
    description: 'Respuesta de solicitud',
    type: SendCampaignResponseDto,
  })
  @Post('campaign')
  async sendCampaign(@Body() sendCampaignDto: SendCampaignDto): Promise<any> {
    try {
      return await this.smsService.sendCampaign(sendCampaignDto);
    } catch (error) {
      throw new HttpException(
        {
          responseCode: '99',
          message: error.message || 'Internal Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
