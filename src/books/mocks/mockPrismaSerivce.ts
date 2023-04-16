export const mockPrismaService = {
  findAll: jest.fn().mockImplementation(),

  findOne: jest.fn().mockImplementation((id) => {
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

  create: jest.fn().mockImplementation((dto) => {
    return {
      id: 1,
      ...dto,
    };
  }),

  update: jest.fn().mockImplementation((id, dto) => {
    return { id: id, ...dto };
  }),

  remove: jest.fn().mockImplementation((id) => {
    return {
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
    };
  }),
};
