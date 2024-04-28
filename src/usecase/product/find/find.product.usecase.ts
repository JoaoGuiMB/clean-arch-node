import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  execute(
    inputFindProductDto: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    return this.productRepository
      .find(inputFindProductDto.id)
      .then((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      });
  }
}
