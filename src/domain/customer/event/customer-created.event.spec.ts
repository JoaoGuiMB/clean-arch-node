import Customer from "../entity/customer";

import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent", () => {
  it("should emit a CustomerCreatedEvent", () => {
    const customer = Customer.create("1", "John Doe");
    const eventHandlers =
      customer.eventDispatcher.getEventHandlers["CustomerCreatedEvent"];

    expect(eventHandlers.length).toBe(2);
  });
});
