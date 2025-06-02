import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthSolucionesResponseDto } from './dtos/auth-soluciones.dto';
import { AxiosService } from '@src/libs/axios/axios.service';
import { SolucionesType } from '@src/libs/config/types.config';

@Injectable()
export class TokenSolucionesService {
  private readonly logger = new Logger(TokenSolucionesService.name);
  private readonly environmentSoluciones: SolucionesType;
  private cachedToken: string | null = null;
  private tokenExpirationTime: Date | null = null;
  private tokenPromise: Promise<string> | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: AxiosService,
  ) {
    this.environmentSoluciones =
      this.configService.get<SolucionesType>('soluciones');
  }

  public async getValidToken(): Promise<string> {
    if (this.tokenPromise) {
      return this.tokenPromise;
    }

    if (this.isTokenValid()) {
      return this.cachedToken;
    }

    this.tokenPromise = this.generateNewToken();

    try {
      const token = await this.tokenPromise;
      return token;
    } finally {
      this.tokenPromise = null;
    }
  }

  public async refreshToken(): Promise<string> {
    this.cachedToken = null;
    this.tokenExpirationTime = null;
    return this.getValidToken();
  }

  private isTokenValid(): boolean {
    if (!this.cachedToken || !this.tokenExpirationTime) {
      return false;
    }

    const bufferTime = 5 * 60 * 1000;
    return (
      new Date().getTime() < this.tokenExpirationTime.getTime() - bufferTime
    );
  }

  private async generateNewToken(): Promise<string> {
    try {
      const responseAuthSoluciones = await this.apiAuthSoluciones();

      this.cachedToken = responseAuthSoluciones.token;

      const expireIn = responseAuthSoluciones.expires;

      this.tokenExpirationTime = new Date(expireIn);

      this.logger.warn(
        `Token generado exitosamente. Expira: ${this.tokenExpirationTime.toISOString()}`,
      );

      return this.cachedToken;
    } catch (error) {
      this.logger.error('Error al generar token:', error);
      throw error;
    }
  }

  private async apiAuthSoluciones(): Promise<{
    token: string;
    expires: string;
  }> {
    const response = await this.http.post<AuthSolucionesResponseDto>(
      `${this.environmentSoluciones.baseUrl}/auth`,
      {
        username: this.environmentSoluciones.username,
        password: this.environmentSoluciones.password,
      },
    );
    return {
      token: response.token,
      expires: response.expires,
    };
  }
}
