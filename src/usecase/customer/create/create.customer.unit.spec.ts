import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Main Street",
    city: "New York",
    number: 123,
    zip: "12345-678",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test create customer", () => {
  it("should create a new customer", async () => {
    const repository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(repository);
    const result = await customerCreateUseCase.execute(input);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };

    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const repository = MockRepository();
    const customerCreateUseCase = new CustomerCreateUseCase(repository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "customer: Name is required"
    );
  });
});
