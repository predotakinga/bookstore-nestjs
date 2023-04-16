import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { mockPrismaService } from './mocks/mockPrismaSerivce';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    expect(service.findAll()).toHaveBeenCalled;
  });

  it('should return book by id', async () => {
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
    expect(service.findOne(id)).toEqual({
      id: id,
      ...dto,
    });
  });

  it('should create book', async () => {
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
    expect(service.create(dto)).toEqual({
      id: 1,
      ...dto,
    });
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
    expect(service.update(id, dto)).toEqual({
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
    expect(service.remove(id)).toEqual({
      id: id,
      ...dto,
    });
  });
});
