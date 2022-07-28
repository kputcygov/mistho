import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SchedulersHistoryService } from './schedulers_history.service';
import { CreateSchedulersHistoryDto } from './dto/create-schedulers_history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedulers history')
@Controller('schedulers-history')
export class SchedulersHistoryController {
  constructor(
    private readonly schedulersHistoryService: SchedulersHistoryService,
  ) {}

  @Post()
  create(@Body() createSchedulersHistoryDto: CreateSchedulersHistoryDto) {
    return this.schedulersHistoryService.create(createSchedulersHistoryDto);
  }

  @Get()
  findAll() {
    return this.schedulersHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulersHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulersHistoryService.remove(+id);
  }
}
