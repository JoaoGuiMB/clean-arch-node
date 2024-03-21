import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangeAddressEvent from "../change-address.event";

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
