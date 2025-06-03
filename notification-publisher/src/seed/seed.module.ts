import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '@src/modules/sms/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
