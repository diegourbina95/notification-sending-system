/* NESTJS IMPORTS */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Injectable()
export class KeynuaService {
  private readonly environment: string;
  constructor(private readonly configService: ConfigService) {
    this.environment = this.configService.get('environment');
  }

  async test() {
    return `EJECUCIÓN EN ENTORNO ${this.environment} v2.5`;
  }
}
