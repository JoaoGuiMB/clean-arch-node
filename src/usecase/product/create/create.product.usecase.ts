import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    inputCreateProductDto: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const newProduct = ProductFactory.create(
      inputCreateProductDto.type,
      inputCreateProductDto.name,
      inputCreateProductDto.price
    );

    await this.productRepository.create(newProduct);
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      type: inputCreateProductDto.type,
    };
  }
}
