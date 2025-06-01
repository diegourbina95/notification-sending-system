import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresqlDBType } from '../config/types.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<PostgresqlDBType>('postgresqlDB').host,
        port: config.get<PostgresqlDBType>('postgresqlDB').port,
        database: config.get<PostgresqlDBType>('postgresqlDB').database,
        username: config.get<PostgresqlDBType>('postgresqlDB').username,
        password: config.get<PostgresqlDBType>('postgresqlDB').password,
        autoLoadEntities: true,
        synchronize: false, // NO TOCAR !
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class PostgreModule {}
