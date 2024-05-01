import Notification from "../notification/notification";

export default abstract class Entity {
  public id: string;
  public notification: Notification;

  constructor(id: string) {
    this.id = id;
    this.notification = new Notification();
  }
}
