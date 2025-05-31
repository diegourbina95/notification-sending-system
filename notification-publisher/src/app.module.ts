/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* LIBRARY IMPORTS */
import { EnvConfiguration } from '@src/libs/config/env.config';
import { PostgreModule } from '@src/libs/database/postgre.module';
import { AxiosModule } from '@src/libs/axios/axios.module';
import { MongooseModule } from '@src/libs/database/mongo.module';

/* MODULES IMPORTS */
import { configSchema } from '@src/libs/config/config.schema';
import { SmsModule } from '@src/modules/sms/sms.module';

@Module({
  imports: [
    /* Libs */
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    PostgreModule,
    MongooseModule,
    AxiosModule,

    /* Modules */
    SmsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
