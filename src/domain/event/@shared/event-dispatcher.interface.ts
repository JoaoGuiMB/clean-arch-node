import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] };
  unregisterAll(): void;
}
