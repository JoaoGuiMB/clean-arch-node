import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/customer/value-object/address";

describe("Product repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Product 1");
    const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "123" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "123" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 2",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should find a product", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const found = await customerRepository.find("1");

    expect(found).toStrictEqual(customer);
  });

  it("should throw error when product not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "customer 1");
    const customer2 = new Customer("2", "customer 2");

    const address1 = new Address("Street 1", 1, "Zip Code 1", "City 1");
    const address2 = new Address("Street 2", 2, "Zip Code 2", "City 2");
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const found = await customerRepository.findAll();

    expect(found).toStrictEqual([customer1, customer2]);
  });
});
