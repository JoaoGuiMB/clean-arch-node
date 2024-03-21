import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "12345-123", "City 1");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Customer 1");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "Customer 1");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });
});
