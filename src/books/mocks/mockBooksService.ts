export const mockBooksService = {
  findAll: jest.fn(() => {
    return {
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
  }),

  findOne: jest.fn((id) => {
    return {
      id: id,
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
  }),

  create: jest.fn((dto) => {
    return {
      id: 1,
      ...dto,
    };
  }),

  update: jest.fn((id, dto) => ({
    id,
    ...dto,
  })),

  remove: jest.fn((id) => ({
    id,
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
  })),
};
