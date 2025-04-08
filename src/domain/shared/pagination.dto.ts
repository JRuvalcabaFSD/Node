export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(object: { [key: string]: any }): PaginationDto {
    const page = parseInt(object.page) || 1;
    const limit = Math.min(parseInt(object.limit) || 10, 30);

    return new PaginationDto(page, limit);
  }
}
