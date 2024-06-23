import { Repository } from 'typeorm';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
  }),
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const getProductMock = () => {
  return { sku: 'BCD345', name: 'Test', price: 1200 };
};

export const getPromotionMock = () => {
  return {
    id: 10,
    productActivation: [
      {
        id: 11,
        quantity: 1,
        product: getProductMock(),
      },
    ],
    productDiscount: [
      {
        id: 10,
        quantity: 1,
        discount: 0.1,
        product: getProductMock(),
      },
    ],
  };
};
