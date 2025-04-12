export interface Ticket {
  id: string;
  number: number;
  createAt: Date;
  handleAtDesk?: string;
  handleAt?: Date;
  done: boolean;
}
