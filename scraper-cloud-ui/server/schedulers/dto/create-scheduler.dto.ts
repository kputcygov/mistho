import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateSchedulerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  expression: string;

  @IsPositive()
  scraperId: number;
}
