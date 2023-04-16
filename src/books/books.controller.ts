import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BooksService } from './books.service';
import { CreateBookDto as BookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() filterDto: GetBooksFilterDto): Promise<BookDto[]> {
    if (Object.keys(filterDto).length) {
      return this.booksService.findBookByFilter(filterDto);
    } else {
      return this.booksService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createBookDto: BookDto) {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: number, @Body() book: BookDto) {
    return this.booksService.update(id, book);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
