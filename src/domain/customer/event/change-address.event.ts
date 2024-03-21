import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventInterface from "../../@shared/event/event.interface";

interface CustomerChangeAddressEventData {
  customer: {
    id: string;
    name: string;
  };
  address: Address;
}

export default class ChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangeAddressEventData;

  constructor(eventData: CustomerChangeAddressEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
