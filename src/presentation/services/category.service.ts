import { envs } from '../../config';
import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from '../../domain';

export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name });
    if (categoryExist) throw CustomError.badRequest('Category already exist');

    try {
      const category = new CategoryModel({ ...createCategoryDto, user: user.id });
      await category.save();

      const { id, name, available } = category;

      return { id, name, available };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    let totalItems = 0;
    let totalPages = 0;

    try {
      totalItems = await CategoryModel.countDocuments();
      totalPages = Math.ceil(totalItems / limit);
    } catch (error) {
      throw CustomError.internalServer();
    }

    totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages && totalItems > 0) throw CustomError.badRequest('Out of rank page');

    const categories = await CategoryModel.find().skip(skip).limit(limit);
    const next = page + 1 <= totalPages ? `${envs.WEBSERVER_URL}api/category?page=${page + 1}&limit=${limit}` : null;
    const prev = page - 1 > 0 ? `${envs.WEBSERVER_URL}api/category?page=${page - 1}&limit=${limit}` : null;

    return { page, limit, totalPages, next, prev, categories };
  }
}
