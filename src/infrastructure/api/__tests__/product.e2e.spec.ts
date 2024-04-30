import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should list all products", async () => {
    await request(app).post("/product").send({
      name: "Product 2",
      price: 100,
      type: "a",
    });
    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(1);
  });
});
