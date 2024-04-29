import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 100);
const product2 = ProductFactory.create("b", "Product 2", 200);

const output = {
  products: [product1, product2],
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);

    const result = await useCase.execute({});

    expect(result.products[0].id).toEqual(output.products[0].id);
    expect(result.products[0].name).toEqual(output.products[0].name);
    expect(result.products[0].price).toEqual(output.products[0].price);
    expect(result.products[1].id).toEqual(output.products[1].id);
    expect(result.products[1].name).toEqual(output.products[1].name);
    expect(result.products[1].price).toEqual(output.products[1].price);
  });
});
