export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {}
  execute({ base, limit = 10 }: CreateTableOptions) {
    let ouputMessage = '';
    for (let i = 1; i <= limit; i++) {
      ouputMessage += `${base} x ${i} = ${base * i}`;
      if (i < limit) ouputMessage += '\n';
    }

    return ouputMessage;
  }
}
