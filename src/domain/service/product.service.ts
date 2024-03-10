import Product from "../domain/entity/product";

export default class ProductService {
  static increasePrices(products: Product[], percentage: number) {
    products.forEach((product) => {
      const newPrice = product.price * (1 + percentage / 100);
      product.changePrice(newPrice);
    });
  }
}
