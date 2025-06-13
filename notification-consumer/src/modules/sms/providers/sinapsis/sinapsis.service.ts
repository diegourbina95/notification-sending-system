import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from '@src/libs/axios/axios.service';
import { SinapsisType } from '@src/libs/config/types.config';

@Injectable()
export class SinapsisService {
  private readonly environmentSinapsis: SinapsisType;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosService,
  ) {
    this.environmentSinapsis = this.configService.get<SinapsisType>('sinapsis');
  }

  public async handleProvider(smsPayload: {
    message: string;
    phoneNumber: string;
  }): Promise<any> {
    return this.apiSinapsis(smsPayload.phoneNumber, smsPayload.message);
  }

  private async apiSinapsis(
    phoneNumber: string,
    message: string,
  ): Promise<any> {
    return await this.http.post(
      `${this.environmentSinapsis.baseUrl}/sms/send-unique-message`,
      {
        message_text: message,
        number: phoneNumber,
      },
      {
        headers: {
          Authorization: `Basic ${this.environmentSinapsis.authorization}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
