import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Scraper } from '../../scrapers/entities/scraper.entity';

@Entity()
export class Scheduler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  expression: string;

  @Column()
  cronjobId: number;

  @OneToOne(() => Scraper)
  @JoinColumn()
  scraper: Scraper;

  @Column({
    type: 'enum',
    enum: ['created', 'creating', 'failed'],
    default: 'created',
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'now()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'now()' })
  updated_at: Date;
}
