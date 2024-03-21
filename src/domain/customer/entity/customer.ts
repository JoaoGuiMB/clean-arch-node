import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import ChangeAddressEvent from "../event/change-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLogChangeAddressHandler from "../event/handler/envia-consolelog-changeAddress";
import EnviaConsolelogHandler from "../event/handler/envia-consolelog.handler";
import EnviaConsolelog2Handler from "../event/handler/envia-consolelog2.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcherInterface = new EventDispatcher();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get eventDispatcher(): EventDispatcherInterface {
    return this._eventDispatcher;
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    customer.eventDispatcher.register(
      "CustomerCreatedEvent",
      new EnviaConsolelogHandler()
    );
    customer.eventDispatcher.register(
      "CustomerCreatedEvent",
      new EnviaConsolelog2Handler()
    );

    const event = new CustomerCreatedEvent(customer);
    customer.eventDispatcher.notify(event);
    return customer;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this._eventDispatcher.register(
      "ChangeAddressEvent",
      new EnviaConsoleLogChangeAddressHandler()
    );

    const eventData = {
      customer: {
        id: this._id,
        name: this._name,
      },
      address: this._address,
    };
    const event = new ChangeAddressEvent(eventData);
    this._eventDispatcher.notify(event);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
