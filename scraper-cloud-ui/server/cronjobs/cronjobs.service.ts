import { Injectable } from '@nestjs/common';
import { CreateCronjobDto } from './dto/create-cronjob.dto';
import { RunCronjobDto } from './dto/run-cronjob.dto';

// NOTE: this service is not in the requirements,
// so it is not implemented following best practices
@Injectable()
export class CronjobsService {
  create(createCronjobDto: CreateCronjobDto): any {
    // TODO: create cronjob
    return {
      id: 1,
    };
  }

  run(runCronJobDto: RunCronjobDto) {
    // TODO: run cronjob
    // make a request to the backend to run the cronjob
  }
}
