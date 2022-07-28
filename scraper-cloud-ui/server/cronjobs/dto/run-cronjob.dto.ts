import { PartialType } from '@nestjs/swagger';
import { CreateCronjobDto } from './create-cronjob.dto';

export class RunCronjobDto extends PartialType(CreateCronjobDto) {}
