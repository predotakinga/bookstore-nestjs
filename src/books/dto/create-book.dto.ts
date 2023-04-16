import { IsArray, IsDateString, IsString } from 'class-validator';

interface IPhotosInput {
  id: number;
  url: string;
}

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsDateString()
  readonly publishedDate: Date;

  @IsArray()
  readonly images: IPhotosInput[];
}
