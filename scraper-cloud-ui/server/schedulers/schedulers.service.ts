import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { Scheduler } from './entities/scheduler.entity';
import { SCHEDULER_REPOSITORY } from '../constants';
import { CronjobsService } from '../cronjobs/cronjobs.service';
import { SchedulersHistoryService } from '../schedulers_history/schedulers_history.service';
import { SchedulersHistory } from '../schedulers_history/entities/schedulers_history.entity';
import { ScrapersService } from '../scrapers/scrapers.service';

@Injectable()
export class SchedulersService {
  constructor(
    @Inject(SCHEDULER_REPOSITORY)
    private readonly schedulersRepository: Repository<Scheduler>,
    private readonly cronjobService: CronjobsService,
    private readonly scrapersService: ScrapersService,
    private readonly schedulersHistoryService: SchedulersHistoryService,
  ) {}
  async create(createSchedulerDto: CreateSchedulerDto): Promise<Scheduler> {
    const cronJob = await this.cronjobService.create(createSchedulerDto);
    const scraper = await this.scrapersService.findOne(
      createSchedulerDto.scraperId,
    );
    const scheduler = this.schedulersRepository.create(createSchedulerDto);
    scheduler.scraper = scraper;
    scheduler.cronjobId = cronJob.id;
    return this.schedulersRepository.save(scheduler);
  }

  findAll(): Promise<Scheduler[]> {
    return this.schedulersRepository.find();
  }

  async findOne(id: number, options?: FindOneOptions): Promise<Scheduler> {
    options.where = { id };
    try {
      return await this.schedulersRepository.findOneOrFail(options);
    } catch (e) {
      throw new NotFoundException(`Scheduler with id ${id} not found`);
    }
  }

  async update(
    id: number,
    updateSchedulerDto: UpdateSchedulerDto,
  ): Promise<Scheduler> {
    const scheduler = await this.findOne(id);
    scheduler.name = updateSchedulerDto.name;
    return this.schedulersRepository.save(scheduler);
  }

  async remove(id: number): Promise<Scheduler> {
    const scheduler = await this.findOne(id);
    return this.schedulersRepository.remove(scheduler);
  }

  async run(id: number): Promise<SchedulersHistory> {
    const scheduler = await this.findOne(id, { relations: { scraper: true } });
    try {
      await this.cronjobService.run({
        scraperId: scheduler.cronjobId,
      });
    } catch (e) {
      await this.schedulersHistoryService.create({
        error: e,
        schedulerId: scheduler.id,
        status: 'failed',
      });
      // TODO: log error
      throw new InternalServerErrorException(
        `Error while running scheduler ${scheduler.scraper.id}`,
      );
    }

    return await this.schedulersHistoryService.create({
      error: '',
      schedulerId: scheduler.id,
      status: 'succeeded',
    });
  }
}
