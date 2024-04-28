import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Main Street", 123, "asd", "city");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Main Street",
        city: "city",
        number: 123,
        zip: "asd",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when customer not found", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    expect(() => useCase.execute(input)).rejects.toThrow("Customer not found");
  });
});
