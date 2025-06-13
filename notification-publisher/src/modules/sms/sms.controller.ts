/* NESTJS IMPORTS */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */
import { SmsService } from '@src/modules/sms/sms.service';
import {
  SendCampaignDto,
  SendCampaignResponseDto,
} from './dtos/send-campaign.dto';
import {
  SendMessagesDto,
  SendMessagesResponseDto,
} from './dtos/send-messages.dto';

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

  @ApiOperation({ summary: 'API para registrar y enviar mensajes por campaña' })
  @ApiOkResponse({
    description: 'Respuesta de solicitud',
    type: SendMessagesResponseDto,
  })
  @Post()
  async sendMessages(@Body() sendMessagesDto: SendMessagesDto) {
    try {
      return await this.smsService.sendMessages(sendMessagesDto);
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
