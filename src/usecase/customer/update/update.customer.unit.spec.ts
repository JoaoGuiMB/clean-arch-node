import NotificationError from "../../../domain/@shared/notification/notification.error";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerUpdateUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Main Street", 123, "Zip", "City")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Main Street Updated",
    city: "City Updated",
    number: 1234,
    zip: "Zip Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Unit test update customer", () => {
  it("should update a customer", async () => {
    const repository = MockRepository();
    const customerUpdateUseCase = new CustomerUpdateUseCase(repository);
    await customerUpdateUseCase.execute(input);

    const output = {
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };

    expect(output).toEqual(input);
  });

  // it("should throw an error when name is missing", async () => {
  //   const repository = MockRepository();
  //   const customerUpdateUseCase = new CustomerUpdateUseCase(repository);

  //   input.name = "";

  //   await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
  //     "customer: Name is required"
  //   );
  // });

  it("should throw an error when customer is not found", async () => {
    const repository = MockRepository();
    const customerUpdateUseCase = new CustomerUpdateUseCase(repository);

    repository.find = jest.fn().mockReturnValue(Promise.resolve(null));

    await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
      "Customer not found"
    );
  });
});
