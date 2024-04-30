import e from "express";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: { street: "Street", city: "city", number: 123, zip: "123456" },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Street");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({ name: "John Doe" });
    expect(response.status).toBe(500);
  });
});
