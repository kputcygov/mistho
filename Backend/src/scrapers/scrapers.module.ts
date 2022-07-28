import { Module } from '@nestjs/common';
import { ScrapersService } from './scrapers.service';
import { ScrapersController } from './scrapers.controller';
import { DatabaseModule } from '../database/database.module';
import { scraperProviders } from './scraper.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ScrapersController],
  providers: [...scraperProviders, ScrapersService],
})
export class ScrapersModule {}
