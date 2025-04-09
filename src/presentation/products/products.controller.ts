import { Request, Response } from 'express';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';
import { ProductService } from '../services';

export class ProductController {
  constructor(private readonly productService: ProductService) {} // private readonly productService

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
    res.status(500).json({ error: 'Internal server error.' });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, data] = CreateProductDto.create({ ...req.body, user: req.body.user.id });
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productService
      .createProduct(data!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };

  getProducts = (req: Request, res: Response) => {
    const data = PaginationDto.create(req.query);

    this.productService
      .getProducts(data!)
      .then((products) => res.json(products))
      .catch((error) => this.handleError(error, res));
  };
}
