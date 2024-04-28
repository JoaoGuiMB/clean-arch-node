import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product 1", 100);

const input = {
  id: product.id,
};

const output = {
  id: product.id,
  name: product.name,
  price: product.price,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);

    const input2 = { id: "123a" };

    expect(() => useCase.execute(input2)).toThrow("Product not found");
  });
});
