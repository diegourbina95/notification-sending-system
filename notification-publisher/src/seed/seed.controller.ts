import { Body, Controller, Post } from '@nestjs/common';
import { PopulateByCampaignDto } from './dtos/populate-by-campaign.dto';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('populate-by-campaign')
  populateByCampaign(@Body() populateByCampaignDto: PopulateByCampaignDto) {
    return this.seedService.populateByCampaign(populateByCampaignDto);
  }
}
