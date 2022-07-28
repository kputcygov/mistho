import { Module } from '@nestjs/common';
import { SchedulersController } from './schedulers.controller';
import { DatabaseModule } from '../database/database.module';
import { schedulerProviders } from './schedulers.provider';
import { CronjobsService } from '../cronjobs/cronjobs.service';
import { SchedulersHistoryService } from '../schedulers_history/schedulers_history.service';
import { SchedulersService } from './schedulers.service';
import { schedulersHistoryProviders } from '../schedulers_history/schedulers_history.providers';
import { ScrapersService } from '../scrapers/scrapers.service';
import { scraperProviders } from '../scrapers/scraper.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SchedulersController],
  providers: [
    ...schedulerProviders,
    ...schedulersHistoryProviders,
    ...scraperProviders,
    CronjobsService,
    ScrapersService,
    SchedulersHistoryService,
    SchedulersService,
  ],
})
export class SchedulersModule {}
