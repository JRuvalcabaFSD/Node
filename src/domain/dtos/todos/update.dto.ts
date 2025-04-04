type Error = {
  httpCode: number;
  message: string;
};

export class UpdateDto {
  private constructor(
    public readonly id?: number,
    public readonly text?: string,
    public readonly completedAt?: Date | null,
  ) {}

  static create(props: { [key: string]: any }): [Error?, UpdateDto?] {
    if (!props) return [{ httpCode: 400, message: 'The request must have at least the text argument' }];

    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) return [{ httpCode: 404, message: 'The ID was not provided' }];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date') return [{ httpCode: 400, message: 'completedAt must be a valida date (yyyy-mm-dd)' }];
    }

    return [undefined, new UpdateDto(id, text, newCompletedAt)];
  }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }
}
