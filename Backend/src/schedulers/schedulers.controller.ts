import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SchedulersService } from './schedulers.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedulers')
@Controller('schedulers')
export class SchedulersController {
  constructor(private readonly schedulersService: SchedulersService) {}

  @Get('/:id/run')
  run(@Param('id', ParseIntPipe) id: number) {
    return this.schedulersService.run(id);
  }

  @Post()
  create(@Body() createSchedulerDto: CreateSchedulerDto) {
    return this.schedulersService.create(createSchedulerDto);
  }

  @Get()
  findAll() {
    return this.schedulersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schedulersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSchedulerDto: UpdateSchedulerDto,
  ) {
    return this.schedulersService.update(id, updateSchedulerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schedulersService.remove(id);
  }
}
