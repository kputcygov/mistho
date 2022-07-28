import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import { Scraper } from './entities/scraper.entity';
import { Repository } from 'typeorm';
import { SCRAPER_REPOSITORY } from '../constants';

@Injectable()
export class ScrapersService {
  constructor(
    @Inject(SCRAPER_REPOSITORY)
    private readonly scraperRepository: Repository<Scraper>,
  ) {}
  create(createScraperDto: CreateScraperDto): Promise<Scraper> {
    const scraper = this.scraperRepository.create(createScraperDto);
    return this.scraperRepository.save(scraper);
  }

  findAll(): Promise<Scraper[]> {
    return this.scraperRepository.find();
  }

  async findOne(id: number): Promise<Scraper> {
    try {
      return await this.scraperRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`Scraper with id ${id} not found`);
    }
  }

  async update(
    id: number,
    updateScraperDto: UpdateScraperDto,
  ): Promise<Scraper> {
    const scraper = await this.findOne(id);
    return this.scraperRepository.save({ ...scraper, ...updateScraperDto});
  }

  async remove(id: number): Promise<Scraper> {
    const scraper = await this.findOne(id);
    return { ...this.scraperRepository.remove(scraper), id };
  }
}
