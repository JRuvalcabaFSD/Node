import { envs } from '../../config';
import { ProductModel } from '../../data';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';

export class ProductService {
  constructor() {}

  async createProduct(productData: CreateProductDto) {
    const productExists = (await ProductModel.countDocuments({ name: productData.name })) >= 1;
    if (productExists) throw CustomError.badRequest('Product already exist');

    try {
      const product = new ProductModel(productData);
      product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    let totalItems = 0;
    let totalPages = 0;

    try {
      totalItems = await ProductModel.countDocuments();
      totalPages = Math.ceil(totalItems / limit);
    } catch (error) {
      throw CustomError.internalServer();
    }

    totalPages = Math.ceil(totalItems / limit);

    const products = await ProductModel.find().skip(skip).limit(limit).populate('user', 'name email').populate('category', 'name');
    const next = page + 1 <= totalPages ? `${envs.WEBSERVER_URL}api/product?page=${page + 1}&limit=${limit}` : null;
    const prev = page - 1 > 0 ? `${envs.WEBSERVER_URL}api/product?page=${page - 1}&limit=${limit}` : null;

    if (page > totalPages && totalItems > 0)
      return {
        error: 'Page out of range',
        firstPage: `${envs.WEBSERVER_URL}api/product?page=1&limit=${limit}`,
      };

    return { page, limit, totalPages, next, prev, products };
  }
}
