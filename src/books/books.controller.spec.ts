import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { mockBooksService } from './mocks/mockBooksService';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', () => {
    const mockBook = {
      id: 1,
      author: 'Andrzej Sapkowski',
      title: 'Wiedźmin, Krew Elfów',
      publishedDate: '1990-01-01',
      images: [
        {
          id: 1,
          url: 'http://www.test.pl/img',
          bookId: 1,
        },
      ],
    };
    expect(controller.findAll({})).toHaveBeenCalled;
    expect(controller.findAll({})).toEqual(mockBook);
  });

  it('should return book by id', () => {
    const id = 1;
    const dto = {
      author: 'Andrzej Sapkowski',
      title: 'Wiedzmin, Krew Elfów',
      publishedDate: '1990-01-01',
      images: [
        {
          id: 1,
          url: 'http://www.test.pl/img',
          bookId: 1,
        },
      ],
    };
    expect(controller.findOne(id)).toEqual({ id: id, ...dto });
  });

  it('should create a book', () => {
    const dto = {
      id: expect.any(Number),
      author: 'Andrzej Sapkowski',
      title: 'Wiedzmin, Krew Elfów',
      publishedDate: expect.any(Date),
      images: [
        {
          id: expect.any(Number),
          url: 'http://www.test.pl/img',
        },
      ],
    };
    expect(controller.create(dto)).toEqual({ id: expect.any(Number), ...dto });
  });

  it('should update a book', () => {
    const id = 1;
    const dto = {
      author: 'Andrzej Sapkowski',
      title: 'Wiedzmin, Krew Elfów',
      publishedDate: expect.any(Date),
      images: [
        {
          id: expect.any(Number),
          url: 'http://www.test.pl/img',
          // bookId: id,
        },
      ],
    };
    expect(controller.update(id, dto)).toEqual({
      id: id,
      ...dto,
    });
  });

  it('should delete a book', () => {
    const id = 1;
    const dto = {
      author: 'Andrzej Sapkowski',
      title: 'Wiedzmin, Krew Elfów',
      publishedDate: '1990-01-01',
      images: [
        {
          id: 1,
          url: 'http://www.test.pl/img',
          bookId: id,
        },
      ],
    };
    expect(controller.remove(id)).toEqual({
      id: id,
      ...dto,
    });
  });
});
