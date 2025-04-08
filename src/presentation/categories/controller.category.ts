import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
    console.log(error);

    return res.status(500).json({ error: 'Internal server error' });
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, data] = CreateCategoryDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }
    console.log(this);

    this.categoryService
      .createCategory(data!, req.body.user)
      .then((resp) => res.status(201).json(resp))
      .catch((error) => this.handleError(error, res));
  };
  getCategory = async (req: Request, res: Response) => {
    this.categoryService
      .getCategories()
      .then((resp) => res.json(resp))
      .catch((error) => this.handleError(error, res));
  };
}
