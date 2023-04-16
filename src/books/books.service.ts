import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto as BookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<BookDto[]> {
    return this.prismaService.book.findMany({
      include: {
        images: true,
      },
    });
  }

  async findBookByFilter(filterDto: GetBooksFilterDto): Promise<BookDto[]> {
    const { title, author } = filterDto;
    let books = await this.findAll();

    if (title) {
      books = books.filter((book) => {
        if (book.title.includes(title)) {
          return true;
        }
        return false;
      });
    }

    if (author) {
      books = books.filter((book) => {
        if (book.author.includes(author)) {
          return true;
        }
        return false;
      });
    }

    return books;
  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BookDto> {
    const book = this.prismaService.book.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
    if (book) return book;
    else throw new NotFoundException(`Book with id = ${id} not exists`);
  }

  async create(
    @Body() { title, author, publishedDate, images }: BookDto,
  ): Promise<BookDto> {
    return this.prismaService.book.create({
      data: {
        title,
        author,
        publishedDate,
        images: {
          create: images,
        },
      },
      include: {
        images: true,
      },
    });
  }

  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() { title, author, publishedDate, images }: BookDto,
  ): Promise<BookDto> {
    return this.prismaService.book.update({
      where: { id },
      data: {
        title,
        author,
        publishedDate,
        images: {
          create: [...images],
        },
      },
      include: {
        images: true,
      },
    });
  }

  async remove(@Param('id', ParseIntPipe) id: number): Promise<BookDto> {
    const book = await this.prismaService.book.findUnique({
      where: { id },
    });
    if (await book)
      return this.prismaService.book.delete({
        where: { id },
        include: { images: true },
      });
    else throw new NotFoundException(`Book with id = ${id} not exists`);
  }
}
