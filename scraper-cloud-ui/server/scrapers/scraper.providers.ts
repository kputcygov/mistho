import { DataSource } from 'typeorm';
import { Scraper } from './entities/scraper.entity';
import { DATA_SOURCE, SCRAPER_REPOSITORY } from '../constants';

export const scraperProviders = [
  {
    provide: SCRAPER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Scraper),
    inject: [DATA_SOURCE],
  },
];
