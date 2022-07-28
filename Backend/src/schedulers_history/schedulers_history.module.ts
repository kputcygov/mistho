import { Module } from '@nestjs/common';
import { SchedulersHistoryService } from './schedulers_history.service';
import { SchedulersHistoryController } from './schedulers_history.controller';
import { schedulersHistoryProviders } from './schedulers_history.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SchedulersHistoryController],
  providers: [...schedulersHistoryProviders, SchedulersHistoryService],
})
export class SchedulersHistoryModule {}
