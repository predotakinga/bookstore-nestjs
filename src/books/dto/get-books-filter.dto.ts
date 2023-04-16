import { IsOptional, IsString } from 'class-validator';

export class GetBooksFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;
}
