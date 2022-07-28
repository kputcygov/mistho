import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchedulersHistoryDto } from './dto/create-schedulers_history.dto';
import { SchedulersHistory } from './entities/schedulers_history.entity';
import {
  SCHEDULERS_HISTORY_REPOSITORY,
  SCRAPER_REPOSITORY,
} from '../constants';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulersHistoryService {
  constructor(
    @Inject(SCHEDULERS_HISTORY_REPOSITORY)
    private readonly schedulersHistoryRepository: Repository<SchedulersHistory>,
  ) {}

  create(
    createSchedulersHistoryDto: CreateSchedulersHistoryDto,
  ): Promise<SchedulersHistory> {
    const schedulersHistory = this.schedulersHistoryRepository.create(
      createSchedulersHistoryDto,
    );
    return this.schedulersHistoryRepository.save(schedulersHistory);
  }

  findAll() {
    return this.schedulersHistoryRepository.find();
  }

  async findOne(id: number): Promise<SchedulersHistory> {
    try {
      return await this.schedulersHistoryRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`SchedulersHistory with id ${id} not found`);
    }
  }

  async remove(id: number): Promise<SchedulersHistory> {
    const schedulersHistory = await this.findOne(id);
    return this.schedulersHistoryRepository.remove(schedulersHistory);
  }
}
