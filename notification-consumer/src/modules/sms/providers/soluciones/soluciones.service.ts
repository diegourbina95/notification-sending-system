/* NESTJS IMPORTS */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

/* LIBRARY IMPORTS */
import { Repository } from 'typeorm';
import { Model } from 'mongoose';

/* MODULES IMPORTS */
import { MessageEntity } from '../../entities/message.entity';
import { ConfigService } from '@nestjs/config';
import { SmsConsumerLogEntity } from '../../entities/sms-consumer-log.entity';
import { CallSmsProviderDto } from '../../dtos/call-sms-provider';
import { ProviderTypes } from '../../types';
import { SmsStatus } from '../../enums';
import { TokenSolucionesService } from '../../providers/soluciones/token-soluciones.service';
import { AxiosService } from '@src/libs/axios/axios.service';
import { SolucionesType } from '@src/libs/config/types.config';
import { solucionesOrigin } from '../../constants';

@Injectable()
export class SolucionesService {
  private readonly logger = new Logger(SolucionesService.name);
  private readonly environmentSoluciones: SolucionesType;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectModel(SmsConsumerLogEntity.name)
    private readonly smsConsumerLogModel: Model<SmsConsumerLogEntity>,
    private readonly tokenSolucionesService: TokenSolucionesService,
    private readonly http: AxiosService,
  ) {
    this.environmentSoluciones =
      this.configService.get<SolucionesType>('soluciones');
  }

  public async handleProvider(smsPayload: {
    processId: string;
    message: string;
    phoneNumber: string;
  }): Promise<{ status: string; message: any }> {
    const token = await this.tokenSolucionesService.getValidToken();
    try {
      await this.apiSoluciones(
        smsPayload.processId,
        smsPayload.phoneNumber,
        smsPayload.message,
        token,
      );
      return {
        status: 'success',
        message: 'Message sent successfully',
      };
    } catch (error) {
      this.logger.error(error);
      if (error?.response?.status === 401) {
        this.logger.warn('Token expired, refreshing token...');
        await this.tokenSolucionesService.refreshToken();
        const newToken = await this.tokenSolucionesService.getValidToken();
        await this.apiSoluciones(
          smsPayload.processId,
          smsPayload.phoneNumber,
          smsPayload.message,
          newToken,
        );
      }
      return {
        status: 'failed',
        message: error?.response?.data?.error || error.message,
      };
    }
  }

  private async apiSoluciones(
    identifier: string,
    phoneNumber: string,
    message: string,
    token: string,
  ): Promise<void> {
    await this.http.post(
      `${this.environmentSoluciones.baseUrl}/api/Mensajes/Texto`,
      {
        origen: solucionesOrigin.SHORT_SMS,
        mensajes: [
          {
            mensaje: message,
            telefono: phoneNumber,
            identificador: identifier,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
