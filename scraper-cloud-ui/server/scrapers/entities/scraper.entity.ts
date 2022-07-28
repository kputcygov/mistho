import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Scraper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  url: string;

  @Column({ type: 'text', array: true, default: [] })
  selectors: string[];

  @Column({ type: 'enum', enum: ['css', 'xpath'], default: 'css' })
  type: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'now()' })
  updated_at: Date;
}
