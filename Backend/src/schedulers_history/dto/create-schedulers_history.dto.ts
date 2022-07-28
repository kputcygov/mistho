import { IsIn, IsPositive, IsString } from 'class-validator';

export class CreateSchedulersHistoryDto {
  @IsPositive()
  schedulerId: number;

  @IsString()
  error: string;

  @IsIn(['succeeded', 'failed'])
  status: string;
}
