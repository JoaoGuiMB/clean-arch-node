import Product from "../../../entity/product";
import EventHandlerInterface from "../../@shared/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogChangeAddressHandler
  implements EventHandlerInterface<ChangeAddressEvent>
{
  handle(event: ChangeAddressEvent): void {
    const eventData = event.eventData;
    console.log(
      `Endereço do cliente: ${eventData.customer.id}, ${
        eventData.customer.name
      } alterado para: ${eventData.address.toString()}`
    );
  }
}
