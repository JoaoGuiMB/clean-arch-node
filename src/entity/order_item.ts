export default class OrderItem {
  id: string;
  name: string;
  price: number;

  constructor(id: string, name: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
