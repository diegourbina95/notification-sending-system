import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BdCore } from '../config/types.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<BdCore>('bdCore').host,
        port: config.get<BdCore>('bdCore').port,
        database: config.get<BdCore>('bdCore').database,
        username: config.get<BdCore>('bdCore').username,
        password: config.get<BdCore>('bdCore').password,
        autoLoadEntities: true,
        synchronize: false, // NO TOCAR !
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class PostgreModule {}
