import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScrapersModule } from './scrapers/scrapers.module';
import { SchedulersModule } from './schedulers/schedulers.module';
import { SchedulersHistoryModule } from './schedulers_history/schedulers_history.module';
import { ConfigModule } from '@nestjs/config';
import { CronjobsService } from './cronjobs/cronjobs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScrapersModule,
    SchedulersModule,
    SchedulersHistoryModule,
  ],
  providers: [AppService, CronjobsService],
})
export class AppModule {}
