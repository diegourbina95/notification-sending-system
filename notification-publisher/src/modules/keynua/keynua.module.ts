/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';

/* LIBRARY IMPORTS */

/* MODULES IMPORTS */
import { KeynuaController } from '@src/modules/keynua/keynua.controller';
import { KeynuaService } from '@src/modules/keynua/keynua.service';

@Module({
  imports: [],
  controllers: [KeynuaController],
  providers: [KeynuaService],
})
export class KeynuaModule {}
