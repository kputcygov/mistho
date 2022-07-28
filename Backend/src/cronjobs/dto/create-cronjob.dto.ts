
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCronjobDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  expression: string;

  @IsPositive()
  scraperId: number;
}
