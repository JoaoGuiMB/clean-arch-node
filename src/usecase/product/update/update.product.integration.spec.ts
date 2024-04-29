import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Product 1", 100);
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: product.id,
      type: "a",
      name: "Product Updated",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type,
    });
  });
});
