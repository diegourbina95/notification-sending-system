/* NESTJS IMPORTS */
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* LIBRARY IMPORTS */
import { AxiosService } from '@src/libs/axios/axios.service';
import { SolucionesType } from '@src/libs/config/types.config';

/* MODULES IMPORTS */
import { TokenSolucionesService } from '../../providers/soluciones/token-soluciones.service';
import { solucionesOrigin } from '../../constants';

@Injectable()
export class SolucionesService {
  private readonly logger = new Logger(SolucionesService.name);
  private readonly environmentSoluciones: SolucionesType;

  constructor(
    private readonly configService: ConfigService,
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
