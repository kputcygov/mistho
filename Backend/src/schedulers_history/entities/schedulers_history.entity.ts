import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Scheduler } from '../../schedulers/entities/scheduler.entity';
import { Scraper } from '../../scrapers/entities/scraper.entity';

@Entity()
export class SchedulersHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schedulerId: number;

  @Column({ type: 'enum', enum: ['succeeded', 'failed'], default: 'succeeded' })
  status: string;

  @Column({ length: 500 })
  error: string;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'now()' })
  last_run_at: Date;
}
