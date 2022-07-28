import { DataSource } from 'typeorm';
import { Scheduler } from './entities/scheduler.entity';
import { DATA_SOURCE, SCHEDULER_REPOSITORY} from '../constants';

export const schedulerProviders = [
  {
    provide: SCHEDULER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Scheduler),
    inject: [DATA_SOURCE],
  },
];
