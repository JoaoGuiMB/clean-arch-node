import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
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

  it("should find products", async () => {
    const productRepository = new ProductRepository();
    const product1 = ProductFactory.create("a", "Product 1", 100);
    const product2 = ProductFactory.create("b", "Product 2", 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const useCase = new ListProductUseCase(productRepository);

    const foundProducts = await useCase.execute({});

    expect(foundProducts.products[0].name).toEqual(product1.name);
    expect(foundProducts.products[1].name).toEqual(product2.name);
  });
});
