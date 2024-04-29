import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 100);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 200,
  type: "a",
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test update product", () => {
  it("should create a new product", async () => {
    const repository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(repository);
    const result = await productUpdateUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type,
    };

    expect(result).toEqual(output);
  });

  it("should throw error when product not found", async () => {
    const repository = MockRepository();

    repository.find = jest.fn().mockImplementation(() => {
      throw new Error("Product not found");
    });
    const productUpdateUseCase = new UpdateProductUseCase(repository);

    const inputInvalid = {
      id: "invalid",
      name: "Product Updated",
      price: 200,
      type: "a",
    };

    await expect(productUpdateUseCase.execute(inputInvalid)).rejects.toThrow(
      "Product not found"
    );

    expect(repository.update).not.toHaveBeenCalled();
  });
});
