import { IsString } from 'class-validator';

export class GetBooksFilterDto {
  // @IsString()
  title?: string;

  // @IsString()
  author?: string;
}