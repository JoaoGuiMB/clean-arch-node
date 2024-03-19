import Address from "../../entity/address";
import Customer from "../../entity/customer";

describe("ChangeAddressEvent", () => {
  it("should emit a ChangeAddressEvent", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
    customer.changeAddress(address);
    const eventHandlers =
      customer.eventDispatcher.getEventHandlers["ChangeAddressEvent"];
    expect(eventHandlers.length).toBe(1);
  });
});
