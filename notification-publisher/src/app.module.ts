/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* LIBRARY IMPORTS */
import { EnvConfiguration } from '@src/libs/config/env.config';
//import { PostgreModule } from '@src/libs/database/postgre.module';
import { AxiosModule } from '@src/libs/axios/axios.module';

/* MODULES IMPORTS */
import { configSchema } from '@src/libs/config/config.schema';
import { KeynuaModule } from '@src/modules/keynua/keynua.module';

@Module({
  imports: [
    /* Libs */
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    //PostgreModule,
    AxiosModule,

    /* Modules */
    KeynuaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
