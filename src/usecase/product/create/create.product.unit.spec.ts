import ProductCreateUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
  type: "a",
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test create product", () => {
  it("should create a new product", async () => {
    const repository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(repository);
    const result = await productCreateUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type,
    };

    expect(result).toEqual(output);
  });

  it("should throw error when create product with invalid type", async () => {
    const repository = MockRepository();
    const productCreateUseCase = new ProductCreateUseCase(repository);

    const inputInvalid = {
      name: "Product 1",
      price: 100,
      type: "invalid",
    };

    await expect(productCreateUseCase.execute(inputInvalid)).rejects.toThrow(
      "Product type not supported"
    );

    expect(repository.create).not.toHaveBeenCalled();
  });
});
