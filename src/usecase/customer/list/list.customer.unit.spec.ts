import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("street", 1, "12345", "city")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane",
  new Address("street 2", 1, "12345", "city")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockResolvedValue(Promise.resolve([customer1, customer2])),
  };
};

describe("Unit test list customer use case", () => {
  it("should list a customer", async () => {
    const repository = MockRepository();
    const listCustomer = new ListCustomerUseCase(repository);
    const output = await listCustomer.execute({});

    expect(output.customers).toHaveLength(2);

    expect(output.customers[0].name).toBe("John");
    expect(output.customers[0].address.street).toBe("street");
    expect(output.customers[0].address.number).toBe(1);
    expect(output.customers[0].address.zip).toBe("12345");
    expect(output.customers[0].address.city).toBe("city");

    expect(output.customers[1].name).toBe("Jane");
    expect(output.customers[1].address.street).toBe("street 2");
    expect(output.customers[1].address.number).toBe(1);
    expect(output.customers[1].address.zip).toBe("12345");
    expect(output.customers[1].address.city).toBe("city");
  });
});
