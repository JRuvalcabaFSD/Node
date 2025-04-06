type Error = {
  httpCode: number;
  message: string;
};

export class CreateDto {
  private constructor(
    public readonly text: string,
    public readonly completedAt?: Date | null,
  ) {}

  static create(props: { [key: string]: any }): [Error?, CreateDto?] {
    if (!props) return [{ httpCode: 400, message: 'The request must have at least the text argument' }];

    const { text } = props;

    if (!text || text.length === 0) return [{ httpCode: 400, message: 'Text property is required' }];

    return [undefined, new CreateDto(text)];
  }
}
