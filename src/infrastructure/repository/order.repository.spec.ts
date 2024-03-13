import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    customer.changeAddress(
      new Address("Main Street", 123, "12345", "Springfield")
    );
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderCreated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    expect(orderCreated?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  test("should update order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    customer.changeAddress(
      new Address("Main Street", 123, "12345", "Springfield")
    );

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();

    const product = new Product("123", "Product 1", 100);
    const product2 = new Product("456", "Product 2", 200);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const newOrderItem = new OrderItem("2", "Product 2", 200, "456", 3);
    order.pushItem(newOrderItem);

    await orderRepository.update(order);

    const orderCreated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderCreated?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          order_id: "123",
          product_id: "456",
        },
      ],
    });
  });

  test("should find a order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    customer.changeAddress(
      new Address("Main Street", 123, "12345", "Springfield")
    );
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.find(order.id);
    expect(orderFound).toStrictEqual(order);
  });

  test("should return all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    customer.changeAddress(
      new Address("Main Street", 123, "12345", "Springfield")
    );

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order]);
  });
});
