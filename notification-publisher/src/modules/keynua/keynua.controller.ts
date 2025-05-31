/* NESTJS IMPORTS */
import { Controller, Get } from '@nestjs/common';
import { KeynuaService } from '@src/modules/keynua/keynua.service';
import { ControllerResponse } from '@src/modules/shared/interface/controller-response.interface';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */

@Controller({
  path: 'keynua',
  version: '1', // estructura del path: /v1/keynua/
})
export class KeynuaController {
  constructor(private readonly keynuaService: KeynuaService) {}

  @Get('test')
  async testController(): Promise<ControllerResponse> {
    try {
      const response = await this.keynuaService.test();
      return {
        responseCode: '00',
        data: response,
      };
    } catch (error) {
      return {
        responseCode: '99',
        message: 'Error Interno',
      };
    }
  }
}
