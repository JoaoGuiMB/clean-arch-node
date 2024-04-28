import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

describe("Test find customer use case", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);
    const input = {
      type: "a",
      name: "Product 1",
      price: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type,
    });

    const productFound = await ProductModel.findOne({
      where: { id: result.id },
    });

    expect(productFound?.toJSON()).toStrictEqual({
      id: result.id,
      name: input.name,
      price: input.price,
    });
  });
});
