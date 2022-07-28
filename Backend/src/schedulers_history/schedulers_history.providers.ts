import { DataSource } from 'typeorm';
import { DATA_SOURCE, SCHEDULERS_HISTORY_REPOSITORY } from '../constants';
import { SchedulersHistory } from './entities/schedulers_history.entity';

export const schedulersHistoryProviders = [
  {
    provide: SCHEDULERS_HISTORY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SchedulersHistory),
    inject: [DATA_SOURCE],
  },
];
