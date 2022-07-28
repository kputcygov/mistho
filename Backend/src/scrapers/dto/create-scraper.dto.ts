import { ArrayNotEmpty, IsIn, IsString, IsUrl } from 'class-validator';

export class CreateScraperDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @ArrayNotEmpty()
  selectors: string[];

  @IsIn(['css', 'xpath'])
  type: string;
}
