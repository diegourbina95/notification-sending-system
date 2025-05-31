import { Module } from '@nestjs/common';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoDBType } from '../config/types.config';

@Module({
  imports: [
    ConfigModule,
    Mongoose.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<MongoDBType>('mongoDB').uri}${configService.get<MongoDBType>('mongoDB').database}`,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseModule {}
