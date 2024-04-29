import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  OutputUpdateProductDto,
  InputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase {
  private repository: ProductRepositoryInterface;
  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.repository.find(input.id);

    await this.repository.update(input);

    return input;
  }
}
