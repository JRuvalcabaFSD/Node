import { Validators } from '../../../config';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available = false, price = 0.0, description, user, category } = object;

    if (!name) return ['Missing name'];
    if (!user) return ['Missing user'];
    if (!category) return ['Missing category'];
    if (!Validators.isMongoId(user)) return ['Invalid user mongoID'];
    if (!Validators.isMongoId(category)) return ['Invalid category mongoID'];

    let availableBoolean = available;
    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true';
    }

    const priceFloat = parseFloat(price);
    if (isNaN(priceFloat) || !isFinite(priceFloat)) return ['The price must be a number with decimals'];

    return [undefined, new CreateProductDto(name, availableBoolean, price, description, user, category)];
  }
}
